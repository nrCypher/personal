import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getData() {
  const settings = await prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });
  const [positionsCount, publicationsCount, projectsCount, patentsCount, studentsCount] = await Promise.all([
    prisma.position.count(), prisma.publication.count(), prisma.project.count(), prisma.patent.count(), prisma.student.count(),
  ]);
  return { settings, positionsCount, publicationsCount, projectsCount, patentsCount, studentsCount };
}

export default async function HomePage() {
  const { settings, positionsCount, publicationsCount, projectsCount, patentsCount, studentsCount } = await getData();
  const interests = settings.researchInterests.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="container-page">
      <section className="grid md:grid-cols-3 gap-8 mb-12 items-start">
        <div className="md:col-span-1">
          <div className="aspect-square w-full max-w-xs mx-auto rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
            {settings.profilePhotoUrl ? (
              <img src={settings.profilePhotoUrl} alt={settings.fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
              </div>
            )}
          </div>
          <div className="mt-5 text-sm text-slate-700 space-y-1">
            {settings.email && <div><span className="font-medium">Email: </span><a href={`mailto:${settings.email}`}>{settings.email}</a></div>}
            {settings.phone && <div><span className="font-medium">Phone: </span>{settings.phone}</div>}
            {settings.address && <div className="text-slate-600 text-xs leading-relaxed mt-2">{settings.address}</div>}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {settings.googleScholarUrl && <a href={settings.googleScholarUrl} target="_blank" rel="noopener noreferrer" className="tag">Google Scholar</a>}
            {settings.orcidUrl && <a href={settings.orcidUrl} target="_blank" rel="noopener noreferrer" className="tag">ORCID</a>}
            {settings.researchGateUrl && <a href={settings.researchGateUrl} target="_blank" rel="noopener noreferrer" className="tag">ResearchGate</a>}
            {settings.linkedinUrl && <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="tag">LinkedIn</a>}
            {settings.githubUrl && <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="tag">GitHub</a>}
          </div>
        </div>
        <div className="md:col-span-2">
          <h1 className="page-title">{settings.fullName || "Your Name"}</h1>
          <p className="text-lg text-primary-700 font-medium">{settings.title}</p>
          {settings.institution && <p className="text-slate-600">{settings.institution}{settings.department && ` · ${settings.department}`}</p>}
          {settings.bio && <div className="mt-6 prose prose-slate max-w-none text-slate-700 leading-relaxed">{settings.bio.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}</div>}
          {interests.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl mb-3">Research Interests</h2>
              <div className="flex flex-wrap gap-2">{interests.map((it, i) => <span key={i} className="tag">{it}</span>)}</div>
            </div>
          )}
        </div>
      </section>
      <section className="border-t border-slate-200 pt-10">
        <h2 className="text-xl mb-4">At a glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[{ label: "Positions", count: positionsCount, href: "/positions" }, { label: "Publications", count: publicationsCount, href: "/publications" }, { label: "Patents", count: patentsCount, href: "/patents" }, { label: "Projects", count: projectsCount, href: "/projects" }, { label: "Students", count: studentsCount, href: "/students" }].map((c) => (
            <Link key={c.href} href={c.href} className="card text-center no-underline hover:border-primary-400 hover:shadow transition-all block">
              <div className="text-3xl font-semibold text-primary-800">{c.count}</div>
              <div className="text-xs uppercase tracking-wide text-slate-600 mt-1">{c.label}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
