import { authOptions } from "@/utils/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"



export const isAuthenticated = async () => {
    
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/Auth/login')
    }
    return {
        userId: session.user.id,
        userEmail: session.user.email,
    }
}


