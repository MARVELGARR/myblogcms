type useUpdatePostType = {
  title: string;
  content: string;
  category: string;
  featured: boolean;
  published?: boolean;
  tag: string[];
};

const updatePost = async (data: useUpdatePostType, postId: string) => {
  try {
    const res = await fetch(`/api/post/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to update post");
    }
    const post = await res.json();
    return post;
  } catch (error) {
    console.log(error);
  }
  return;
};

export default updatePost;
