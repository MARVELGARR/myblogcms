import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { serverSideAuth } from "../isAdmin";
import { prisma } from "@/prisma/prisma";


const getAllPost = async () => {

    const {isAdmin, isAuthenticated} = await serverSideAuth()
    isAuthenticated()
    isAdmin()

    const posts = await prisma.post.findMany({
        include: {
            category: true,
            PostReaction: true,
            Comment: true,
        }
    })
    return posts;
}
 
export default getAllPost;