import { getUserCoins } from "@/actions/fetchActions";
import vine,{errors} from "@vinejs/vine";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { Document } from "@langchain/core/documents";
import prisma from "@/lib/prisma";
import { summarySchema } from "@/validations/summaryValidation";

export async function POST(req:NextRequest){
    const token = await getToken({req});
    if(!token){
        return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });

    }
    try{
        const body = await req.json()
        const validator = vine.compile(summarySchema)
        const payload = await validator.validate(body)

        // * check user have coins or not

        const userCoins = await getUserCoins(payload.user_id)
        if(userCoins === null || (userCoins?.coins && userCoins?.coins <10)){
            return NextResponse.json({ message: "Insufficient coins" }, { status: 400 });
        }

        // get the transcript after that 
        let text:Document<Record<string, any>>[]
        try{
            const loader = YoutubeLoader.createFromUrl(payload.url, {
                language: "en",
                addVideoInfo: true,  // give metadata
              });
              
              text= await loader.load();
        }catch(error){
            return NextResponse.json({ message: "No Transcript available for this video.Plese try another video" }, { status:404})
        }


        const chat = await prisma.summary.create({
            data: {
              ...payload,
              user_id: Number(payload.user_id),
              title: text[0].metadata?.title ?? "No Title found!",
            },
          });

        return NextResponse.json({
            message:"URL Added Successfully",data:chat
        })
        
    }catch(error){
        console.log("The Add URL Error",error)
        if(error instanceof errors.E_VALIDATION_ERROR){
            return NextResponse.json({ 
                message: "Please check validation errors",
                errors:error.messages
            
            }, { status: 422 });
        }
        return NextResponse.json({message:"Something went wrong.Please Try again"},{status:500})
    }


}