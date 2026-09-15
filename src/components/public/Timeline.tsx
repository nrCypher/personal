import type { AcademicPathEntry } from "@prisma/client";
import { ACADEMIC_PATH_CATEGORIES, categoryLabel, yearRange } from "@/types";

const CATEGORY_STYLES: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  degree: { bg: "bg-primary-50", text: "text-primary-900", dot: "bg-primary-600", border: "border-primary-200" },
  habilitation: { bg: "bg-amber-50", text: "text-amber-900", dot: "bg-amber-600", border: "border-amber-200" },
  career: { bg: "bg-emerald-50", text: "text-emerald-900", dot: "bg-emerald-600", border: "border-emerald-200" },
  award: { bg: "bg-purple-50", text: "text-purple-900", dot: "bg-purple-600", border: "border-purple-200" },
};

export default function Timeline({ entries }: { entries: AcademicPathEntry[] }) {
  if (entries.length === 0) return <p className="text-slate-500 italic">No academic path entries yet.</p>;
  return (
    <div className="relative pl-6 md:pl-0">
      <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200" aria-hidden="true" />
      <ul className="space-y-10">
        {entries.map((entry, index) => {
          const style = CATEGORY_STYLES[entry.category] ?? CATEGORY_STYLES.career;
          const isLeft = index % 2 === 0;
          return (
            <li key={entry.id} className="relative">
              <span className={`absolute left-2 md:left-1/2 -translate-x-1/2 top-2 w-4 h-4 rounded-full border-4 border-white ${style.dot} shadow`} aria-hidden="true" />
              <div className={`md:grid md:grid-cols-2 md:gap-8 ${isLeft ? "" : "md:[&>div:first-child]:order-2"}`}>
                <div className={`pl-8 md:pl-0 ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <div className={`inline-block ${style.bg} ${style.text} ${style.border} border rounded-lg px-4 py-3 shadow-sm`}>
                    <div className="text-xs font-semibold uppercase tracking-wide opacity-75">{categoryLabel(ACADEMIC_PATH_CATEGORIES, entry.category)}</div>
                    <div className="font-semibold mt-1">{entry.title}</div>
                    <div className="text-sm mt-0.5">{entry.institution}</div>
                    {entry.location && <div className="text-xs opacity-75 mt-0.5">{entry.location}</div>}
                    {entry.description && <p className="text-sm mt-2 opacity-90">{entry.description}</p>}
                  </div>
                </div>
                <div className={`hidden md:block ${isLeft ? "md:pl-8 md:text-left" : "md:pr-8 md:text-right"}`}>
                  <div className="text-2xl font-semibold text-slate-700 pt-2">{yearRange(entry.year, entry.endYear)}</div>
                </div>
                <div className="md:hidden pl-8 pt-1 text-sm font-semibold text-slate-600">{yearRange(entry.year, entry.endYear)}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
