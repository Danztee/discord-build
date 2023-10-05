import { compare } from "bcryptjs";
import { db } from "@/lib/db";
import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(db),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("please fill in all fields");

        const user = await db.profile.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) throw new Error("invalid credentials");

        const correctPassword = await compare(
          credentials?.password!,
          user.password
        );

        if (!correctPassword) throw new Error("invalid credentials");

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt" as SessionStrategy,
  },

  secret: process.env.NEXTAUTH_SECRET!,

  debug: process.env.NODE_ENV !== "production",

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
