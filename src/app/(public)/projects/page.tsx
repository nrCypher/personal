import PageHeader from "@/components/public/PageHeader";
import ProjectCard from "@/components/public/ProjectCard";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: [{ startYear: "desc" }, { sortOrder: "asc" }] });
  const ongoing = projects.filter((p) => !p.endYear);
  const completed = projects.filter((p) => p.endYear);
  return (
    <div className="container-page">
      <PageHeader title="R&amp;D Projects" subtitle="Research and development projects." />
      {ongoing.length > 0 && <section className="mb-10"><h2 className="mb-4">Ongoing Projects</h2><div className="grid md:grid-cols-2 gap-5">{ongoing.map((p) => <ProjectCard key={p.id} project={p} />)}</div></section>}
      {completed.length > 0 && <section><h2 className="mb-4">Completed Projects</h2><div className="grid md:grid-cols-2 gap-5">{completed.map((p) => <ProjectCard key={p.id} project={p} />)}</div></section>}
      {projects.length === 0 && <p className="text-slate-500 italic">No projects added yet.</p>}
    </div>
  );
}
