import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

// Get all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch categories" }, { status: 500 });
  }
}

// Create a new category
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ success: false, error: "Category name is required" }, { status: 400 });
    }
    const category = await prisma.category.create({
      data: { name },
    });
    return NextResponse.json({ success: true, category });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create category" }, { status: 500 });
  }
}