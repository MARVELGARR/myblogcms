import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest, {params}: { params : Promise<{categoryId: string}>}) {
  try { 
    const { categoryId } = await params

    if (!categoryId ) {
      return NextResponse.json({ success: false, error: "Category ID and name are required" }, { status: 400 });
    }
    const category = await prisma.category.delete({
      where: { 
        id: categoryId
       },
    });
    return NextResponse.json({ success: true, category });
  } catch (error) {
    return NextResponse.json({ success: false, error: `Failed to delete category ${error}` }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, {params}: { params : Promise<{categoryId: string}>}) {
  try {

     const { categoryId } = await params
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ success: false, error: "Category name is required" }, { status: 400 });
    }
    
    const category = await prisma.category.update({
        where: {
            id: categoryId
        },
      data: { name},
    });
    return NextResponse.json({ success: true, category });
  } catch (error) {
    return NextResponse.json({ success: false, error: `Failed to update category ${error}` }, { status: 500 });
  }
}