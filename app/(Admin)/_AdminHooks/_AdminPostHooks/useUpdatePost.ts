import { useMutation } from "@tanstack/react-query";
import updatePost from "../../_AdminActions/_Admin_Post_Action/updatePost";

const useUpdatePost = (postId: string) => {

    const {mutateAsync: updatePostById, isPending: isUpdatingPostById, isError:updatePostByIdError} = useMutation({
        mutationFn: (data: any)=>updatePost(data, postId)
    })
    return {
        updatePostById,
        isUpdatingPostById,
        updatePostByIdError
    };
}
 
export default useUpdatePost;