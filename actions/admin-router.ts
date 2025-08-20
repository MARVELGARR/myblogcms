import { usePathname, useSearchParams } from "next/navigation";

export function useAdminRoute() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // Get query params
  const subPost = searchParams.get("subPost");
  const subSettings = searchParams.get("subSettings");

  // Map routes to component keys
  if (pathName === "/Admin/dashboard") return "dashboard";
  if (pathName === "/Admin/posts" && subPost === "allPost") return "allPosts";
  if (pathName === "/Admin/posts" && subPost === "new") return "newPost";
  if (pathName === "/Admin/posts" && subPost === "drafts") return "drafts";
  if (pathName === "/Admin/media") return "media";
  if (pathName === "/Admin/comments") return "comments";
  if (pathName === "/Admin/category") return "category";
  if (pathName === "/Admin/users") return "users";
  if (pathName === "/Admin/settings" && subSettings === "profile") return "profileSettings";
  if (pathName === "/Admin/settings") return "settings";
  return "notFound";
}