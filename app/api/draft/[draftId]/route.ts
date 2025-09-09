import { prisma } from "@/prisma/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ draftId: string }> }
) {
  const { draftId } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "un-authenticated" }, { status: 401 });
  }
  if (!draftId) {
    return NextResponse.json(
      { success: false, error: "draft ID and is required" },
      { status: 400 }
    );
  }

  const body = await request.json();
  try {

    const updateDraft = await prisma.draft.update({
      where: {
        id: draftId,
      },
      data: {...body},
    });

    if(updateDraft){
        return NextResponse.json(updateDraft)

    }
    else{
        return NextResponse.json({message: "No draft werer found"})
    }
  } catch (error) {
     return NextResponse.json({ message: `Failed to update draft: ${error}` }, { status: 500 })
  }
}
