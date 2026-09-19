import type { CvEntry } from "@/data/cv/types";

const chip =
  "inline-flex items-center gap-1 rounded border px-1.5 py-px text-[11px] leading-4 no-underline transition-colors";

function PdfLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={`${chip} border-accent-500 font-semibold text-accent-600 hover:bg-accent-500 hover:text-white`}>
      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
      </svg>
      {label}
    </a>
  );
}

export default function CvEntryList({
  entries, docsFolder, emptyLabel, fileLabel, linkLabels,
}: {
  entries: CvEntry[];
  docsFolder: string;
  emptyLabel: string;
  fileLabel: string;
  linkLabels: Record<string, string>;
}) {
  if (entries.length === 0) return <p className="text-sm italic text-slate-400">{emptyLabel}</p>;

  return (
    <ol className="list-decimal space-y-3 pl-5 text-sm text-slate-700 marker:text-slate-400">
      {entries.map((entry, i) => {
        const links = (entry.links ?? []).filter((l) => l.url !== entry.url);
        return (
          <li key={i} className="leading-relaxed">
            <div className="flex flex-wrap items-baseline gap-x-2">
              {entry.year && <span className="font-semibold text-slate-900">{entry.year}</span>}
              <span className="min-w-0">
                {entry.url ? (
                  <a href={entry.url} target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-primary-700">
                    {entry.text}
                  </a>
                ) : (
                  entry.text
                )}
              </span>
            </div>
            {entry.authors && <div className="mt-0.5 text-xs text-slate-600">{entry.authors}</div>}
            {entry.meta && <div className="mt-0.5 text-xs italic text-slate-500">{entry.meta}</div>}
            {(entry.file || links.length > 0) && (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {entry.file && <PdfLink href={`/docs/${docsFolder}/${entry.file}`} label={fileLabel} />}
                {links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${chip} ${
                      link.kind === "free"
                        ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                        : "border-slate-300 text-slate-500 hover:border-primary-600 hover:text-primary-700"
                    }`}
                  >
                    {linkLabels[link.kind] ?? linkLabels.other}
                  </a>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
