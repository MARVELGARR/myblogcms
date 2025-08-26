import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../_AdminActions/AdminCategoryActions";

const useUpdateCategory = () => {
    const QueryClient = useQueryClient()

    const {mutateAsync: updateCategoryFn, isPending: isUpdatingCategory, isError: isUpdateingError} = useMutation({
        mutationFn: ({id, name}: {id: string, name: string})=> updateCategory(id, name),
        onSettled: ()=>{
            QueryClient.invalidateQueries({queryKey: ["categories"]})
        }
    })
    return {
        updateCategoryFn,
        isUpdatingCategory,
        isUpdateingError
    };
}
 
export default useUpdateCategory;