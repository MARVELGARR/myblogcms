'use server'

import { prisma } from "@/prisma/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const onSubscribe = async (email: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const sub = await prisma.$transaction(async (tx) => {
      // check if subscription exists
      const existing = await tx.subscription.findFirst({
        where: {
          email,
          userId: session.user.id,
        },
      });

      if (existing) {
        return existing; // don’t create duplicate
      }

      // create new one
      return await tx.subscription.create({
        data: {
          email,
          userId: session.user.id,
        },
      });
    });

    return sub;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while subscribing");
  }
};

export default onSubscribe;
