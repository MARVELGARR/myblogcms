import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"


export async function POST(req: Request){

    const reaction = await req.json()

    try{

        const req = await prisma.reaction.create({
            data: {
                react: reaction
            }
        })

        if(!req){
            return NextResponse.json({message: "Failed to create reaction"}, {status: 404})
        }
        return NextResponse.json({req})
    }
    catch(error){
        return NextResponse.json({ message: `Failed to create reaction: ${error}` }, { status: 500 })
    }
}