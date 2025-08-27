import { prisma } from "@/prisma/prisma";
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




export const createNewCategory = async (name: string) =>{

  try{

    const res = await fetch(`/api/category`, {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(name)
    })
  
    const data = await res.json();

      
    return data ; 
  }
  catch(error){
    throw new Error(`${error}`);
  }

}
export const updateCategory = async (id: string, name: string) =>{

  try{

    const res = await fetch(`/api/category/${id}`, {
      method: "PATCH",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({id, name})
    })
  
    const data = await res.json();

      
    return data ; 
  }
  catch(error){
    throw new Error(`${error}`);
  }

}