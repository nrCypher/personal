import { signIn, auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Admin Login" };

async function login(formData: FormData) {
  "use server";
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  try { await signIn("credentials", { username, password, redirectTo: "/admin" }); }
  catch (err) { const msg = err instanceof Error ? err.message : String(err); if (msg.includes("NEXT_REDIRECT")) throw err; redirect("/admin/login?error=1"); }
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const session = await auth();
  if (session) redirect("/admin");
  const sp = await searchParams;
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-primary-900 mb-1">Admin Login</h1>
        <p className="text-sm text-slate-600 mb-6">Sign in to manage site content.</p>
        {sp.error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">Invalid username or password.</div>}
        <form action={login} className="space-y-4">
          <div><label className="label" htmlFor="username">Username</label><input id="username" name="username" type="text" required autoFocus className="input" /></div>
          <div><label className="label" htmlFor="password">Password</label><input id="password" name="password" type="password" required className="input" /></div>
          <button type="submit" className="btn-primary w-full">Sign in</button>
        </form>
      </div>
    </div>
  );
}
