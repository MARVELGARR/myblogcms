import { Prisma } from "@prisma/client"

type PostByIdProp = Prisma.PostGetPayload<{
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
}>

const getPostById = async (id: string): Promise<PostByIdProp> => {

    try{

        const res = await fetch(`/api/post/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({id}),
        })
        const post = await res.json()
        if(!post){
            console.log("post not founf")
        }
        return post
    }
    catch(error){
        throw new Error(`${error}`)
    }
    ;
}
 
export default getPostById;