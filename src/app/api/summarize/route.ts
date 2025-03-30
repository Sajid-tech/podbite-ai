import { NextRequest, NextResponse } from "next/server";
import { authOptions, CustomSession } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getUserCoins } from "@/actions/fetchActions";
import prisma from "@/lib/prisma";

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

    // check user url ? is that url already summarized ?


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
        
      }














  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong.Please Try again" },
      { status: 500 }
    );
  }
}
