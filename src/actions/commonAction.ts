"use server"

import prisma from "@/lib/prisma";

import { revalidateTag, unstable_cache } from "next/cache";


export async function updateSummary(data:string ,  id: string):Promise<void>{
  await prisma.summary.update({
    data:{
      response:data  
    },
    where:{
      id:id
    }
  })

}

export async function minusCoins(user_id: number | string): Promise<void> {
  await prisma.user.update({
    where: { id: Number(user_id) },
    data: {
      coins: {
        decrement: 10,
      },
    },
  });
}


export async function addCoins(user_id: number | string, coins:number): Promise<void> {
  await prisma.user.update({
    where: { id: Number(user_id) },
    data: {
      coins: {
        increment: coins,
      },
    },
  });
}


export async function coinsSpend(user_id:number | string,  summaryId: string):Promise<void>{
  await prisma.coinSpend.create({
    data:{
      user_id:Number(user_id),
      summary_id: summaryId
    }
  })

}


export async function clearCache (key: string) {
  revalidateTag(key);
};