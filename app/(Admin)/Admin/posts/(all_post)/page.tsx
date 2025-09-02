import getAllPost from "@/app/(Admin)/_AdminActions/_Admin_Post_Action/getPost";
import AdminPostComponents from "@/components/AdminPostComponent/admin_post-component";

const PostPage = async () => {
  const posts = await getAllPost();

  return (
    <div className="container mx-auto">
      <AdminPostComponents posts={posts} />
    </div>
  );
};

export default PostPage;
