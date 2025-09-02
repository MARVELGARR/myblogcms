
import { Prisma } from "@prisma/client";
import { serverSideAuth } from "../isAdmin";
import { prisma } from "@/prisma/prisma";


export type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    category: true;
    PostReaction: true;
    Comment: true;
  };
}>;

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