import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import { deletePatent } from "@/lib/actions/patents";

export default async function AdminPatentsList() {
  const patents = await prisma.patent.findMany({ orderBy: [{ date: "desc" }, { sortOrder: "asc" }] });
  return (
    <div>
      <AdminPageHeader title="Patents" action={{ href: "/admin/patents/new", label: "+ Add Patent" }} />
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-slate-50 text-slate-600 text-xs uppercase"><tr><th className="text-left px-4 py-2">Patent #</th><th className="text-left px-4 py-2">Title</th><th className="text-left px-4 py-2">Country</th><th className="text-left px-4 py-2">Date</th><th className="text-right px-4 py-2">Actions</th></tr></thead>
          <tbody>
            {patents.length === 0 && <tr><td colSpan={5} className="text-center py-8 text-slate-500">No patents yet.</td></tr>}
            {patents.map((p) => (
              <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-mono text-xs">{p.patentNumber}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{p.title}</td>
                <td className="px-4 py-3 text-slate-700">{p.country}</td>
                <td className="px-4 py-3 text-slate-700">{p.date}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Link href={`/admin/patents/${p.id}/edit`} className="text-sm mr-4">Edit</Link>
                  <DeleteButton action={async () => { "use server"; await deletePatent(p.id); }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
