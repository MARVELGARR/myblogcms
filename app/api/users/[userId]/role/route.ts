import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params
    const { role } = await request.json()

    await prisma.user.update({
      where: { id: userId },
      data: { role }
    });

    return NextResponse.json({ message: "User role updated successfully", status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Failed to update user role", status: 500 }, { status: 500 })
  }
}
