import { useQuery } from "@tanstack/react-query";
import getPostById from "../../_AdminActions/_Admin_Post_Action/getPostById";

const useGetPostById = (id: string) => {


    const { data:postDetailes, isLoading: isLoadingPostDetails, isError: isPostDetailsError } = useQuery({
        queryKey: ['post', id],
        queryFn: ()=>getPostById(id)
    })
    return { 
        postDetailes,
        isLoadingPostDetails,
        isPostDetailsError
    };
}
 
export default useGetPostById;