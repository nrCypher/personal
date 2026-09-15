import type { Publication } from "@prisma/client";

export default function PublicationList({ publications }: { publications: Publication[] }) {
  if (publications.length === 0) return <p className="text-slate-500 italic">No publications in this category yet.</p>;
  const byYear = new Map<number, Publication[]>();
  for (const p of publications) { const list = byYear.get(p.year) ?? []; list.push(p); byYear.set(p.year, list); }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a);
  return (
    <div className="space-y-8">
      {years.map((year) => (
        <div key={year}>
          <h3 className="text-lg font-semibold text-primary-800 mb-3 pb-1 border-b border-slate-200">{year}</h3>
          <ol className="space-y-4 list-decimal list-inside marker:text-slate-400">
            {byYear.get(year)!.map((p) => (
              <li key={p.id} className="pl-2">
                <span className="text-slate-800">{p.authors}</span>{p.authors && ", "}
                <span className="font-medium text-slate-900">&ldquo;{p.title}&rdquo;</span>
                {p.venue && <span className="italic text-slate-700">, {p.venue}</span>}
                {p.volume && <span className="text-slate-700">, vol. {p.volume}</span>}
                {p.pages && <span className="text-slate-700">, pp. {p.pages}</span>}
                <span className="text-slate-700">, {p.year}</span>
                {p.doi && <>{". "}<a href={p.doi.startsWith("http") ? p.doi : `https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline text-sm">DOI: {p.doi}</a></>}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
