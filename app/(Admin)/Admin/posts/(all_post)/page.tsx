import getAllPost from "@/app/(Admin)/_AdminActions/_Admin_Post_Action/getPost";

const PostPage = async () => {


    const posts = await getAllPost()

    
    return (
        <div className="">{JSON.stringify(posts)}</div>
    );
}
 
export default PostPage;