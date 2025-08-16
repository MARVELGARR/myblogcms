import  { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";



import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma } from "@prisma/client";
import { Role } from "@/lib/generated/prisma/client";
import { _PrismaClient_ } from "@/prisma/prisma";

declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name: string;
        email: string;
        image?: string;
        role: Role;
      };
    }
  
    interface JWT {
      id: string;
    }
  }
  

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(Prisma) as unknown as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),


    ],
    callbacks: {
        async jwt({ token, user, account }) {
            const dbUser = await _PrismaClient_.user.findFirst({
                where:{
                    email: token.email
                }
            })

            if (!dbUser) {
                token.id = user.id;
                return token
            }
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                role: dbUser.role
            };
          
        },
    async session({ session, token }) {
        if(session.user){

                session.user.id = token.id as string;
                session.user.role = token.role as Role;
            }
            return session;
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