import PageHeader from "@/components/public/PageHeader";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Patents" };

export default async function PatentsPage() {
  const patents = await prisma.patent.findMany({ orderBy: [{ date: "desc" }, { sortOrder: "asc" }] });
  return (
    <div className="container-page">
      <PageHeader title="Patents" subtitle="Registered patents and inventions." />
      {patents.length === 0 ? <p className="text-slate-500 italic">No patents added yet.</p> : (
        <ol className="space-y-5 list-decimal list-inside marker:text-slate-400 marker:font-semibold">
          {patents.map((p) => (
            <li key={p.id} className="pl-2">
              <div className="inline">
                <span className="text-slate-800">{p.authors}</span>{p.authors && ", "}
                <span className="font-semibold text-slate-900">&ldquo;{p.title}&rdquo;</span>
                {p.patentNumber && <span className="text-slate-700">, Patent {p.patentNumber}</span>}
                {p.country && <span className="text-slate-700">, {p.country}</span>}
                {p.date && <span className="text-slate-700">, {p.date}</span>}
              </div>
              {p.description && <p className="text-sm text-slate-600 mt-1 ml-6">{p.description}</p>}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
