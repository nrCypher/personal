import type { Project } from "@prisma/client";
import { yearRangeOrPresent } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
  const isOngoing = !project.endYear;
  return (
    <article className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          {project.acronym && <div className="text-xs font-semibold text-accent-600 uppercase tracking-wide">{project.acronym}</div>}
          <h3 className="text-lg font-semibold text-primary-900 leading-tight">{project.title}</h3>
        </div>
        {isOngoing ? <span className="badge-current shrink-0">Ongoing</span> : <span className="badge-completed shrink-0">Completed</span>}
      </div>
      <dl className="mt-3 text-sm text-slate-700 space-y-1">
        {project.role && <div className="flex gap-2"><dt className="font-medium text-slate-600 w-20 shrink-0">Role:</dt><dd>{project.role}</dd></div>}
        {project.funder && <div className="flex gap-2"><dt className="font-medium text-slate-600 w-20 shrink-0">Funder:</dt><dd>{project.funder}</dd></div>}
        {project.reference && <div className="flex gap-2"><dt className="font-medium text-slate-600 w-20 shrink-0">Ref.:</dt><dd className="font-mono text-xs">{project.reference}</dd></div>}
        <div className="flex gap-2"><dt className="font-medium text-slate-600 w-20 shrink-0">Period:</dt><dd>{yearRangeOrPresent(project.startYear, project.endYear)}</dd></div>
      </dl>
      {project.description && <p className="mt-3 text-sm text-slate-600 leading-relaxed">{project.description}</p>}
      {project.url && <div className="mt-3"><a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-700 hover:underline">Visit project website →</a></div>}
    </article>
  );
}
