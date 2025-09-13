import { prisma } from "@/prisma/prisma"
import { status } from "effect/Fiber"
import { NextResponse } from "next/server"



export async function DELETE(request: Request,
  { params }: { params: Promise<{ reactionsId: string }> }){

    const {reactionsId} = await  params

    console.log(reactionsId)

    try{

        const req = await prisma.reaction.delete({
            where: {
                id: reactionsId
            }
        })
        if(!req){
            return NextResponse.json({message: "Failed to delete reaction, reaction not found"},{status: 404})
        }
        return NextResponse.json(req)
    }
    catch(error){
        return NextResponse.json({message: "Failed to delete reaction"}, {status: 500})
    }
  }