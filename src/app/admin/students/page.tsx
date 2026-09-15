import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteStudent } from "@/lib/actions/students";
import { STUDENT_CATEGORIES, categoryLabel, yearRangeOrPresent } from "@/types";

export default async function AdminStudentsList() {
  const students = await prisma.student.findMany({ orderBy: [{ category: "asc" }, { startYear: "desc" }, { sortOrder: "asc" }] });
  return (
    <div>
      <AdminPageHeader title="Students" action={{ href: "/admin/students/new", label: "+ Add Student" }} />
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-slate-50 text-slate-600 text-xs uppercase"><tr><th className="text-left px-4 py-2">Name</th><th className="text-left px-4 py-2">Category</th><th className="text-left px-4 py-2">Thesis</th><th className="text-left px-4 py-2">Period</th><th className="text-left px-4 py-2">Status</th><th className="text-right px-4 py-2">Actions</th></tr></thead>
          <tbody>
            {students.length === 0 && <tr><td colSpan={6} className="text-center py-8 text-slate-500">No students yet.</td></tr>}
            {students.map((s) => (
              <tr key={s.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">{s.name}</td>
                <td className="px-4 py-3 text-slate-700">{categoryLabel(STUDENT_CATEGORIES, s.category)}</td>
                <td className="px-4 py-3 text-slate-700 max-w-md truncate">{s.thesisTitle}</td>
                <td className="px-4 py-3 text-slate-700">{yearRangeOrPresent(s.startYear, s.endYear)}</td>
                <td className="px-4 py-3">{s.status === "completed" ? <span className="badge-completed">Completed</span> : <span className="badge-current">{s.status}</span>}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Link href={`/admin/students/${s.id}/edit`} className="text-sm mr-4">Edit</Link>
                  <DeleteButton action={async () => { "use server"; await deleteStudent(s.id); }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
