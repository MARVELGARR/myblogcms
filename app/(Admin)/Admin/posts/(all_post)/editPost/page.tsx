import EditPostEditor from "@/app/(Admin)/_AdminComponents/edit-posrEditor";
import { prisma } from "@/prisma/prisma";

const EditPostPage = async ({searchParams}: {searchParams: Record<string, string | string[]>}) => {

    const postId =  searchParams?.postId

    const post = await prisma.post.findFirst({
        where: {
            id: postId as string
        },
        include: {
            author: {
                select: {
                    name: true,

                }
            },
            category: {
                select: {
                    name: true
                }
            }
        },
        
    })

    if(!post){
        return (
            <div className="">loading</div>
        )
    }

    return (
        <div className="h-full">

        <EditPostEditor post={post}/>

        </div>
    );
}
 
export default EditPostPage;