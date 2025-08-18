import  { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";



import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/prisma";
import { Role } from "@prisma/client";


declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name: string;
        email: string;
        image?: string;
      };
    }
  
    interface JWT {
      id: string;
    }
  }
  

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as unknown as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),


    ],
    callbacks: {
        async jwt({ token }) {

          const dbUser = await prisma.user.findUnique({
            where: {
              email: token.email as string,
            },
          })
          if(!dbUser){
            return token
          }

          return {
            ...token,
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.image,
            role: dbUser.role,
            
          }
        },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          image: token.image as string | undefined,
          role: token.role as Role | undefined,

          
        },
      }
    },
  },
    pages: {
        signIn: "/Auth/login",
        error: "/Auth/error",
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
};