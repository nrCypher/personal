import type { Metadata } from "next";
import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

async function signOutAction() { "use server"; await signOut({ redirectTo: "/admin/login" }); }

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) return <div className="min-h-screen bg-slate-50">{children}</div>;
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-slate-600">Signed in as <span className="font-medium text-slate-800">{session.user?.name}</span></div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm">View site →</Link>
            <form action={signOutAction}><button className="btn-secondary text-sm" type="submit">Sign out</button></form>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
