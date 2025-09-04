'use client'
import { PostWithRelations } from "@/app/(Admin)/_AdminActions/_Admin_Post_Action/getPost";
import PostCard from "./postUI/post-card";
import FilterTrigger from "../post-ui-component/filter-trigger";
import { useMemo } from "react";
import { useFilterStore } from "@/zustand/post-filter-store";




const AdminPostComponents = ({ posts }: {posts: PostWithRelations[]}) => {
      const { titleFilter, categoryFilter, dateFilter } = useFilterStore()

      const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Title filter
      if (titleFilter && !post.title.toLowerCase().includes(titleFilter.toLowerCase())) {
        return false
      }

      // Category filter
      if (categoryFilter !== "all" && post.categoryId !== categoryFilter) {
        return false
      }

      // Date filter
      if (dateFilter !== "all") {
        const postDate = new Date(post.createdAt)
        const now = new Date()

        switch (dateFilter) {
          case "today":
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            const postDay = new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate())
            if (postDay.getTime() !== today.getTime()) return false
            break
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            if (postDate < weekAgo) return false
            break
          case "month":
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
            if (postDate < monthAgo) return false
            break
          case "year":
            const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
            if (postDate < yearAgo) return false
            break
        }
      }

      return true
    })
  }, [posts, titleFilter, categoryFilter, dateFilter])

  
  return (
    <div className="">

        <div className="w-full flex justify-between">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-balance">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-2">Manage your blog posts</p>
            </div>

            <FilterTrigger/>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts?.map((post) => {
          return <PostCard key={post.id} {...post} />;
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
