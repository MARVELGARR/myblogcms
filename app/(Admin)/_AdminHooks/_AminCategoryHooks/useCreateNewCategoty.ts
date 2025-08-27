import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCategory } from "../../_AdminActions/AdminCategoryActions";

const useCreateNewCategory = () => {
    const QueryClient = useQueryClient()
    
    const {mutateAsync: createCategoty, isPending: isCreatingNewCategory, isError: isCreatingNewCategoryError} = useMutation({
        mutationFn: (name: string)=> createNewCategory(name),
        onSettled: ()=>{
            QueryClient.invalidateQueries({queryKey: ["categories"]})
        }
    })

    return {createCategoty, isCreatingNewCategory, isCreatingNewCategoryError}
}
 
export default useCreateNewCategory;