import { NextRequest, NextResponse } from "next/server";
import { authOptions, CustomSession } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getUserCoins } from "@/actions/fetchActions";
import prisma from "@/lib/prisma";
import { coinsSpend, minusCoins, updateSummary } from "@/actions/commonAction";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { Document } from "@langchain/core/documents";
import { TokenTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "@langchain/core/prompts";
import { loadSummarizationChain } from "langchain/chains";
import { geminiModal } from "@/lib/langchain";
import { summaryTemplate } from "@/lib/prompts";

interface SummarizePayload {
  url: string;
  id: string;
}

export async function POST(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }

    const body: SummarizePayload = await req.json();
    // * check user have coins or not

    const userCoins = await getUserCoins(session?.user?.id!);
    if (userCoins === null || (userCoins?.coins && userCoins?.coins < 10)) {
      return NextResponse.json(
        { message: "Insufficient coins" },
        { status: 400 }
      );
    }

    /* check user url ? is that url already summarized ?  */
    const oldSummary = await prisma.summary.findFirst({
      select: {
        response: true,
      },
      where: {
        url: body.url,
      },
    });

    if (oldSummary != null && oldSummary.response) {
      // * Do things
      await minusCoins(session?.user?.id!);
      await coinsSpend(session?.user?.id!, body.id);
      return NextResponse.json({
        message: "Podcast video Summary",
        data: oldSummary.response,
      });
    }
    /*---------------------------------------------------------------*/
    // now if is its new url than do this-- extract the transcript 
    let text: Document<Record<string, any>>[];
    try {
      const loader = YoutubeLoader.createFromUrl(body.url!, {
        language: "en",
        addVideoInfo: true,
      });
      text = await loader.load();
    } catch (error) {
      return NextResponse.json(
        {
          message:
            "No Transcript available for this video.Plese try another video",
        },
        { status: 404 }
      );
    }

    const splitter = new TokenTextSplitter({
      chunkSize: 15000,
      chunkOverlap: 250,
    });
    const docsSummary = await splitter.splitDocuments(text);
    const summaryPrompt = PromptTemplate.fromTemplate(summaryTemplate);
    const summaryChain =  loadSummarizationChain(geminiModal,{
      type:"map_reduce",
      verbose:true,
      combinePrompt:summaryPrompt
    })

    const res = await summaryChain.invoke({ input_documents: docsSummary });

    // do this thing

    await minusCoins(session?.user?.id!)
    await coinsSpend(session?.user?.id!, body.id)
    await updateSummary(res.text,body?.id!)
   
    return NextResponse.json({
      message:"Podcast video Summary",
      data:res?.text
    })
       
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong.Please Try again" },
      { status: 500 }
    );
  }
}
