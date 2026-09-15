import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!username || !password) return null;
        const expectedUsername = process.env.ADMIN_USERNAME;
        const expectedHash = process.env.ADMIN_PASSWORD_HASH;
        if (!expectedUsername || !expectedHash) return null;
        if (username !== expectedUsername) return null;
        const ok = await bcrypt.compare(password, expectedHash);
        if (!ok) return null;
        return { id: "admin", name: expectedUsername, email: `${expectedUsername}@local` };
      },
    }),
  ],
});
