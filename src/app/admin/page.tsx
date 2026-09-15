import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default async function AdminDashboard() {
  const [academic, positions, publications, patents, projects, students] = await Promise.all([
    prisma.academicPathEntry.count(), prisma.position.count(), prisma.publication.count(),
    prisma.patent.count(), prisma.project.count(), prisma.student.count(),
  ]);
  const cards = [
    { href: "/admin/settings", label: "Site Settings", count: null, desc: "Bio, contact, social links" },
    { href: "/admin/academic-path", label: "Academic Path", count: academic, desc: "Degrees, milestones, awards" },
    { href: "/admin/positions", label: "Positions", count: positions, desc: "Academic and professional positions" },
    { href: "/admin/publications", label: "Publications", count: publications, desc: "Journal, conference, books" },
    { href: "/admin/patents", label: "Patents", count: patents, desc: "Registered patents" },
    { href: "/admin/projects", label: "Projects", count: projects, desc: "R&D projects" },
    { href: "/admin/students", label: "Students", count: students, desc: "PhD, MSc, Postdoc" },
  ];
  return (
    <div>
      <AdminPageHeader title="Dashboard" description="Manage the content shown on your public site." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="card hover:border-primary-400 hover:shadow transition-all no-underline block">
            <div className="flex items-start justify-between gap-3">
              <div><div className="font-semibold text-slate-900">{c.label}</div><p className="text-sm text-slate-600 mt-1">{c.desc}</p></div>
              {c.count !== null && <div className="text-2xl font-semibold text-primary-800">{c.count}</div>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
