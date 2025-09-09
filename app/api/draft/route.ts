import { prisma } from "@/prisma/prisma"
import { authOptions } from "@/utils/authOptions"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"





export async function POST(request: Request){
    const body = await request.json()
    const session = await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({message: "un-authenticated"},{status: 401})
    }
    
    const { title, content, category, featured, published, tag } = body
        try {
            
            const createDraft = await prisma.draft.create({
                data: {
                    title,
                    content,
                    category:  category,
                    author: {
                        connect: {
                            id: session.user.id as string
                        }
                    },

                    tag,
                }
            })
    
            if(!createDraft){
                return NextResponse.json({message: "Draft not created"}, {status: 404})
            }
            return NextResponse.json(createDraft)
        }
        catch (error) {
            return NextResponse.json({ message: `Failed to create draft: ${error}` }, { status: 500 })
        }

}