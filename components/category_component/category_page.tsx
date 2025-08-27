'use client'
import { useGetCategory } from "@/app/(Admin)/_AdminHooks/_AminCategoryHooks/useGetCategory";
import { CategoryCard } from "./category-card";
import CreateNewCategoryButton from "./create-new-category-button";



const CategoryPage =  () => {


    const { data} = useGetCategory()


    
    return (
        <div className="relative">
            <div className="">{data?.map((category)=>{
                
                return (
                    <CategoryCard key={category.id} category={category}/>
                )
            })}</div>

            <CreateNewCategoryButton className="absolute"/>
        </div>
    );
}
 
export default CategoryPage;