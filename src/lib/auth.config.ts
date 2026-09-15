import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    async authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      const isAdminArea = path.startsWith("/admin");
      const isLoginPage = path === "/admin/login";
      if (isAdminArea && !isLoginPage) return !!auth;
      return true;
    },
  },
};
