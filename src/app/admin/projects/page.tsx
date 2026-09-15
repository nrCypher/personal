import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteProject } from "@/lib/actions/projects";
import { yearRangeOrPresent } from "@/types";

export default async function AdminProjectsList() {
  const projects = await prisma.project.findMany({ orderBy: [{ startYear: "desc" }, { sortOrder: "asc" }] });
  return (
    <div>
      <AdminPageHeader title="Projects" action={{ href: "/admin/projects/new", label: "+ Add Project" }} />
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-slate-50 text-slate-600 text-xs uppercase"><tr><th className="text-left px-4 py-2">Acronym</th><th className="text-left px-4 py-2">Title</th><th className="text-left px-4 py-2">Role</th><th className="text-left px-4 py-2">Period</th><th className="text-right px-4 py-2">Actions</th></tr></thead>
          <tbody>
            {projects.length === 0 && <tr><td colSpan={5} className="text-center py-8 text-slate-500">No projects yet.</td></tr>}
            {projects.map((p) => (
              <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-mono text-xs">{p.acronym}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{p.title}</td>
                <td className="px-4 py-3 text-slate-700">{p.role}</td>
                <td className="px-4 py-3 text-slate-700">{yearRangeOrPresent(p.startYear, p.endYear)}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Link href={`/admin/projects/${p.id}/edit`} className="text-sm mr-4">Edit</Link>
                  <DeleteButton action={async () => { "use server"; await deleteProject(p.id); }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
