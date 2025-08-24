
import { prisma } from "@/prisma/prisma";
import { isAuthenticated } from "./AdminActions";
// import { Post } from "@prisma/client";


type SubmitPostData = {
  title: string;
  content: string;
  image?: string;
  featured: boolean;
  categoryId: string;
  authorId: string;
  tags: string[]; // array of tag names or IDs
}

export async function submitData(postData: SubmitPostData ) {
  const {userId} =await isAuthenticated();
  
  // Create the post
  const post = await prisma.post.create({
    data: {
      title: postData.title,
      content: postData.content,
      image: postData.image,
      featured: postData.featured,
      categoryId: postData.categoryId,
      authorId: userId,
      tag: postData.tags, 
    },

  });

  return { success: true, post };
}