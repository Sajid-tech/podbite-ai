import DashNav from '@/components/dashboard/DashNav'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { getUserCoins } from '@/actions/fetchActions';

export default async function dashboard() {
    const session: CustomSession | null = await getServerSession(authOptions);
    const userCoins = await getUserCoins(session?.user?.id!)
  return (
    <div className='container mx-auto'>
        <DashNav user={session?.user!}  userCoins={userCoins}/>
    </div>
  )
}

