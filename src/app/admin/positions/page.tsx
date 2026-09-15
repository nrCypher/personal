import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import { deletePosition } from "@/lib/actions/positions";
import { yearRangeOrPresent } from "@/types";

export default async function AdminPositionsList() {
  const items = await prisma.position.findMany({ orderBy: [{ isCurrent: "desc" }, { startYear: "desc" }, { sortOrder: "asc" }] });
  return (
    <div>
      <AdminPageHeader title="Positions" action={{ href: "/admin/positions/new", label: "+ Add Position" }} />
      <div className="card p-0 overflow-hidden"><table className="w-full text-sm"><thead className="bg-slate-50 text-slate-600 text-xs uppercase"><tr><th className="text-left px-4 py-2">Title</th><th className="text-left px-4 py-2">Institution</th><th className="text-left px-4 py-2">Period</th><th className="text-right px-4 py-2">Actions</th></tr></thead><tbody>
        {items.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-slate-500">No items yet.</td></tr>}
        {items.map((p) => (<tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-800">{p.title}</td><td className="px-4 py-3 text-slate-700">{p.institution}</td><td className="px-4 py-3 text-slate-700">{yearRangeOrPresent(p.startYear, p.endYear)}</td><td className="px-4 py-3 text-right whitespace-nowrap"><Link href={`/admin/positions/${p.id}/edit`} className="text-sm mr-4">Edit</Link><DeleteButton action={async () => { "use server"; await deletePosition(p.id); }} /></td></tr>))}
      </tbody></table></div>
    </div>
  );
}
