'use server'

import { prisma } from "@/prisma/prisma";

const onSubscribe = async (email: string) => {

    try{

        const sub = await prisma.subscription.create({
            data: {
                email
            }
        })
        return sub
    }
    catch(error){
        throw new Error("Something went wrong")
    }
}
 
export default onSubscribe;