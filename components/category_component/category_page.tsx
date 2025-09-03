import { CategoryCard } from "./category-card";
import CreateNewCategoryButton from "./create-new-category-button";
import { GetCategoryProp } from "@/app/(Admin)/_AdminActions/AdminCategoryActions";



const CategoryPage =  ({categories}:{categories: GetCategoryProp["categories"]}) => {



    
    return (
        <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{categories?.map((category)=>{
                
                return (
                    <CategoryCard key={category.id} category={category}/>
                )
            })}</div>

            <CreateNewCategoryButton className="absolute"/>
        </div>
    );
}
 
export default CategoryPage;