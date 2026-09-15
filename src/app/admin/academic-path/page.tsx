import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteAcademicPathEntry } from "@/lib/actions/academic-path";
import { categoryLabel, ACADEMIC_PATH_CATEGORIES, yearRange } from "@/types";

export default async function AdminAcademicPathList() {
  const entries = await prisma.academicPathEntry.findMany({ orderBy: [{ year: "desc" }, { sortOrder: "asc" }] });
  return (
    <div>
      <AdminPageHeader title="Academic Path" action={{ href: "/admin/academic-path/new", label: "+ Add Entry" }} />
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-slate-50 text-slate-600 text-xs uppercase"><tr><th className="text-left px-4 py-2">Year</th><th className="text-left px-4 py-2">Category</th><th className="text-left px-4 py-2">Title</th><th className="text-left px-4 py-2">Institution</th><th className="text-right px-4 py-2">Actions</th></tr></thead>
          <tbody>
            {entries.length === 0 && <tr><td colSpan={5} className="text-center py-8 text-slate-500">No entries yet.</td></tr>}
            {entries.map((e) => (
              <tr key={e.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-700">{yearRange(e.year, e.endYear)}</td>
                <td className="px-4 py-3 text-slate-700">{categoryLabel(ACADEMIC_PATH_CATEGORIES, e.category)}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{e.title}</td>
                <td className="px-4 py-3 text-slate-700">{e.institution}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Link href={`/admin/academic-path/${e.id}/edit`} className="text-sm mr-4">Edit</Link>
                  <DeleteButton action={async () => { "use server"; await deleteAcademicPathEntry(e.id); }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
