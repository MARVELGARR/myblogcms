import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"
import { Post } from '../../../../components/AdminPostComponent/postUI/post-card';




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

export async function GET(request: Request, { params }: { params: Promise<{ postId: string }> }) {
    const { postId } = await params

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: {
                    select: {
                        name: true,
                        role:true,
                        
                    }
                },
                PostReaction: true,
                Comment: {
                    select: {
                        id: true,
                    }
                },
                category: {
                    select: {
                        name: true,
                    }
                },

            }
        })

        if(!post){
            return NextResponse.json({})
        }
        return NextResponse.json(post)
    }
    catch (error) {
        return NextResponse.json({ message: `Failed to fetch post: ${error}` }, { status: 500 })
    }
}


export async function PATCH(request: Request, { params }: { params: Promise<{ postId: string }> }) {
    const { postId } = await params
    const body = await request.json()
    const { title, content, category, featured, published, tag } = body
    try {
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                content,
                category: {
                    update: {
                        name: category
                    }
                },
                featured,
                published,
                tag,
            }
        })

        if(!updatedPost){
            return NextResponse.json({message: "Post not found"}, {status: 404})
        }
        return NextResponse.json(updatedPost)
    }
    catch (error) {
        return NextResponse.json({ message: `Failed to update post: ${error}` }, { status: 500 })
    }
}