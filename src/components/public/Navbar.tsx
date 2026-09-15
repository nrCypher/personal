"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { SiteSettings } from "@prisma/client";

const NAV_ITEMS = [
  { href: "/", label: "Home" }, { href: "/academic-path", label: "Academic Path" },
  { href: "/positions", label: "Positions" }, { href: "/publications", label: "Publications" },
  { href: "/patents", label: "Patents" }, { href: "/projects", label: "Projects" },
  { href: "/students", label: "Students" },
];

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="bg-primary-900 text-white border-b-4 border-accent-500 shadow-sm sticky top-0 z-40">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="text-white hover:text-primary-100 no-underline">
          <div className="font-semibold text-lg leading-tight">{settings.fullName || "Personal Website"}</div>
          {settings.title && <div className="text-xs text-primary-200">{settings.title}</div>}
        </Link>
        <button aria-label="Toggle menu" className="md:hidden p-2 rounded hover:bg-primary-800" onClick={() => setOpen(!open)}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={`px-3 py-2 rounded text-sm font-medium no-underline transition-colors ${isActive(item.href) ? "bg-primary-800 text-white" : "text-primary-100 hover:bg-primary-800 hover:text-white"}`}>{item.label}</Link>
          ))}
        </nav>
      </div>
      {open && (
        <nav className="md:hidden border-t border-primary-800 bg-primary-900">
          <div className="container-page py-2 flex flex-col">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`px-3 py-2 rounded text-sm font-medium no-underline ${isActive(item.href) ? "bg-primary-800 text-white" : "text-primary-100 hover:bg-primary-800"}`}>{item.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
