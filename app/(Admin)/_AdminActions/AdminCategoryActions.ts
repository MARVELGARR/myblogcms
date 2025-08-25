import { Category } from "@prisma/client";


//Get Categories
type GetCategoryProp ={
    success: boolean;
    categories?:  Array<{name: string, id: string, createdAt: Date, updatedAt: Date} >;
}

export const getCategories = async (): Promise<GetCategoryProp> => {
  const res = await fetch("/api/category");
  const data = await res.json();
  if (!data.success)
    throw new Error(data.error || "Failed to fetch categories");
  return data ;
};


// //Create Category
// type CreateCategoryProps = {

// }

// export const createNewCategory = async ({}: Category) =>{

// }