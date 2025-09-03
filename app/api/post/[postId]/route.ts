import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"




export async function DELETE(requset: Request, { params }: { params: Promise<{ postId: string }> }){

    const { postId }= await params

    try{

        const postDeleted = await prisma.post.delete({
            where: {
                id: postId
            }
        })
        if(!postDeleted){
            return NextResponse.json({message: "Post not found"}, {status: 404})
        }
        return NextResponse.json({message: "Post deleted successfully", postDeleted}, {status: 200})

    }
    catch(error){
        return NextResponse.json({message: `Failed to delete post: ${error}`}, {status: 500})
    }
}