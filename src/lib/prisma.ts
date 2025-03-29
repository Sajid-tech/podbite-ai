// db_config_file 

import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient()

// export default prisma; 

// by above code you can get the err that prisma is running on 10 instance like that for that write like that 


const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

 export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log:["query","error"]
 })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


export default  prisma