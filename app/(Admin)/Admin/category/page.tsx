import CategoryPage from "@/components/category_component/category_page";
import { getCategories } from "../../_AdminActions/AdminCategoryActions";


const CartegoryPage = async () => {

    const categories = await getCategories()
    return (
        <CategoryPage categories={categories}/>
    );
}
 
export default CartegoryPage;