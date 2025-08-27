"use server"
import { prisma } from "@/prisma/prisma";
// import { Post } from "@prisma/client";


type SubmitPostData = {
  title: string;
  description: string
  content: string;
  image?: string;
  featured: boolean;
  categoryId: string;
  tags: string[]; // array of tag names or IDs
}

export async function submitData(postData: SubmitPostData, userId: string) {

  // Create the post
  const post = await prisma.post.create({
    data: {
      title: postData.title,
      description:postData.description,
      content: postData.content,
      image: postData.image,
      featured: postData.featured,
      categoryId: postData.categoryId,
      authorId: userId || "68a0beda9cbfb6d5ef3b70eb",
      tag: postData.tags, 
    },

  });

  return { success: true, post };
}