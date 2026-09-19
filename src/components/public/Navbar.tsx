"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SiteSettings } from "@prisma/client";

type NavChild = { href: string; label: string };
type NavItem = { href: string; label: string; children?: NavChild[] };

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" }, { href: "/academic-path", label: "Academic Path" },
  { href: "/positions", label: "Positions" }, { href: "/publications", label: "Publications" },
  { href: "/patents", label: "Patents" }, { href: "/projects", label: "Projects" },
  { href: "/students", label: "Students" },
  { href: "/cv-academic", label: "CV Academic", children: [
    { href: "/cv-academic/en/cvrricvlvm-vitae-short-summary", label: "Summary" },
    { href: "/cv-academic/en/scientific-merits", label: "Scientific Merit" },
    { href: "/cv-academic/en/pedagogical-merits", label: "Pedagogical Merit" },
    { href: "/cv-academic/en/further-relevant-activities", label: "Merit in other Relevant Activities" },
    { href: "/cv-academic/en/contacts", label: "Contacts" },
  ] },
];

const linkClass = (active: boolean) =>
  `px-2.5 py-2 rounded text-sm font-medium no-underline transition-colors ${active ? "bg-primary-800 text-white" : "text-primary-100 hover:bg-primary-800 hover:text-white"}`;

function DesktopDropdown({ item, isActive }: { item: NavItem; isActive: (href: string) => boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}
    >
      <Link
        href={item.href}
        aria-haspopup="true"
        aria-expanded={open}
        className={`${linkClass(isActive(item.href))} inline-flex items-center gap-1`}
      >
        {item.label}
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </Link>
      {open && (
        <div className="absolute right-0 top-full min-w-56 rounded-b bg-primary-900 border border-t-0 border-primary-800 shadow-lg py-1 z-50">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 text-sm no-underline whitespace-nowrap ${isActive(child.href) ? "bg-primary-800 text-white" : "text-primary-100 hover:bg-primary-800 hover:text-white"}`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

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
        <button aria-label="Toggle menu" className="lg:hidden p-2 rounded hover:bg-primary-800" onClick={() => setOpen(!open)}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => item.children
            ? <DesktopDropdown key={item.href} item={item} isActive={isActive} />
            : <Link key={item.href} href={item.href} className={linkClass(isActive(item.href))}>{item.label}</Link>
          )}
        </nav>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-primary-800 bg-primary-900">
          <div className="container-page py-2 flex flex-col">
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className={`block ${linkClass(isActive(item.href))}`}>{item.label}</Link>
                {item.children && (
                  <div className="ml-4 border-l border-primary-800 pl-2 flex flex-col">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} onClick={() => setOpen(false)} className={`block ${linkClass(isActive(child.href))} text-xs`}>{child.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
