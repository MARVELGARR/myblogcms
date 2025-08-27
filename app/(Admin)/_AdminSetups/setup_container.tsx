"use client"
import { useAdminRoute } from "@/actions/admin-router";
import CreatePost from "./createPost";
import CategoryPage from "@/components/category_component/category_page";


export default  function  AdminHome() {


    const routeKey = useAdminRoute();

  // Map routeKey to components
  switch (routeKey) {
    case "dashboard":
      return <div>Dashboard Component</div>;
    case "allPosts":
      return (
        <>Me</>
      );
    case "newPost":
      return <CreatePost/>;
    case "drafts":
      return <div>Drafts Component</div>;
    case "media":
      return <div>Media Component</div>;
    case "comments":
      return <div>Comments Component</div>;
    case "category":
      return <div><CategoryPage/></div>;
    case "users":
      return <div>Users Component</div>;
    case "profileSettings":
      return <div>Profile Settings Component</div>;
    case "settings":
      return <div>Settings Component</div>;
    default:
      return <div>Not Found</div>;
  }
}
