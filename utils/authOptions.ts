import  { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";


import { Prisma } from "@/prisma/prisma";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";

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
    adapter: PrismaAdapter(Prisma) as unknown as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),


    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if(session.user){

                session.user.id = token.id as string;
            }
            return session;
        },
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
};