
import { useGetCategory } from "@/app/(Admin)/_AdminHooks/_AminCategoryHooks/useGetCategory";
import { CategoryCard } from "./category-card";



const CategoryPage =  () => {


    const { data} = useGetCategory()


    
    return (
        <div className="">
            <div className="">{data?.map((category)=>{
                
                return (
                    <CategoryCard key={category.id} category={category}/>
                )
            })}</div>
        </div>
    );
}
 
export default CategoryPage;