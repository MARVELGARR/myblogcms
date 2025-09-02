import CategoryPage from "@/components/category_component/category_page";
import { getCategories } from "../../_AdminActions/AdminCategoryActions";
import { prisma } from "@/prisma/prisma";


const CartegoryPage = async () => {

    const categories = await prisma.category.findMany()
    return (
        <CategoryPage categories={categories}/>
    );
}
 
export default CartegoryPage;