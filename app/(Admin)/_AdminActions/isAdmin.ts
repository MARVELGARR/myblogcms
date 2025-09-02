import { authOptions } from "@/utils/authOptions";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const serverSideAuth = async () => {
  const session = await getServerSession(authOptions);

  const isAuthenticated = () => {
    if (!session) {
      redirect("/Auth/login");
    }
    return true; // Explicitly return boolean
  };

  const isAdmin = () => {
    if (!session) {
      redirect("/Auth/login"); // Ensure user is logged in first
    }

    const role = session?.user?.role;
    if (role == Role.ADMIN) {
      redirect("/unauthorized"); // Optional: redirect non-admins
    }

    return true;
  };

  return { isAuthenticated, isAdmin };
};
