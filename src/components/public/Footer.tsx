import type { SiteSettings } from "@prisma/client";
import Link from "next/link";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-sm">
      <div className="container-page py-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <div className="font-medium text-slate-800">{settings.fullName || "Personal Website"}</div>
          {settings.institution && <div>{settings.institution}</div>}
          {settings.email && <div><a href={`mailto:${settings.email}`}>{settings.email}</a></div>}
        </div>
        <div className="text-xs text-slate-500">
          &copy; {year} {settings.fullName || ""}. All rights reserved.{" "}
          <Link href="/admin" className="text-slate-500 hover:text-primary-700">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
