import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"



export async function POST(req: Request){

    const {email} = await req.json()
    try{

        const sub = await prisma.subscription.create({
            data: {
                email
            }
        })

        if(!sub){
            return NextResponse.json({message: "Your subscription failed"}, {status: 404})
        }
        
        return NextResponse.json({message: "You have successfully subscribed"}, {status: 201})
    }
    catch(error){
        return NextResponse.json({message: "Internal server error"}, {status: 500})
    }
}