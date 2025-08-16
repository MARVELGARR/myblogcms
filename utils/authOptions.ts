import  { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";



import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma } from "@prisma/client";

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
    async session({ session, token }) {
      return session
    },
    async jwt({ token, account }) {
      return token
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