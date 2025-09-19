import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params


   const deletedUser = await prisma.user.delete({
      where: { id: userId }
    });

    if(!deletedUser){
        return NextResponse.json({message: "messasge not found"}, {status: 404})
    }

    return NextResponse.json({ message: "User deleted successfully", status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete user", status: 500 }, { status: 500 })
  }
}
