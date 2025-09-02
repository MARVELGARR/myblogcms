import { PostWithRelations } from "@/app/(Admin)/_AdminActions/_Admin_Post_Action/getPost";
import PostCard from "./postUI/post-card";




const AdminPostComponents = ({ posts }: {posts: PostWithRelations[]}) => {
  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-balance">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your blog posts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => {
          return <PostCard {...post} />;
        })}
      </div>
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found</p>
        </div>
      )}
    </div>
  );
};

export default AdminPostComponents;
