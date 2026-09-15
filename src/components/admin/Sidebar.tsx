"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/settings", label: "Site Settings" },
  { href: "/admin/academic-path", label: "Academic Path" },
  { href: "/admin/positions", label: "Positions" },
  { href: "/admin/publications", label: "Publications" },
  { href: "/admin/patents", label: "Patents" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/students", label: "Students" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-primary-900 text-white flex flex-col">
      <div className="px-5 py-5 border-b border-primary-800">
        <Link href="/admin" className="text-white no-underline">
          <div className="text-xs uppercase tracking-wider text-primary-300">Backoffice</div>
          <div className="font-semibold text-lg">Content Admin</div>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {ADMIN_NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/");
          return <Link key={item.href} href={item.href} className={`block px-3 py-2 rounded text-sm no-underline ${active ? "bg-primary-700 text-white" : "text-primary-100 hover:bg-primary-800"}`}>{item.label}</Link>;
        })}
      </nav>
      <div className="px-5 py-4 border-t border-primary-800 text-xs text-primary-300">Personal Website</div>
    </aside>
  );
}
