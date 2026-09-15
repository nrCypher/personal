import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import { deletePublication } from "@/lib/actions/publications";
import { categoryLabel, PUBLICATION_CATEGORIES } from "@/types";

export default async function AdminPublicationsList() {
  const publications = await prisma.publication.findMany({ orderBy: [{ year: "desc" }, { sortOrder: "asc" }] });
  return (
    <div>
      <AdminPageHeader title="Publications" action={{ href: "/admin/publications/new", label: "+ Add Publication" }} />
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-slate-50 text-slate-600 text-xs uppercase"><tr><th className="text-left px-4 py-2">Year</th><th className="text-left px-4 py-2">Category</th><th className="text-left px-4 py-2">Title</th><th className="text-left px-4 py-2">Venue</th><th className="text-right px-4 py-2">Actions</th></tr></thead>
          <tbody>
            {publications.length === 0 && <tr><td colSpan={5} className="text-center py-8 text-slate-500">No publications yet.</td></tr>}
            {publications.map((p) => (
              <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-700">{p.year}</td>
                <td className="px-4 py-3 text-slate-700">{categoryLabel(PUBLICATION_CATEGORIES, p.category)}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{p.title}</td>
                <td className="px-4 py-3 text-slate-700">{p.venue}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Link href={`/admin/publications/${p.id}/edit`} className="text-sm mr-4">Edit</Link>
                  <DeleteButton action={async () => { "use server"; await deletePublication(p.id); }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
