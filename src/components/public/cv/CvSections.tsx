import type { CvPage } from "@/data/cv/types";
import CvEntryList from "./CvEntryList";

export default function CvSections({
  page, emptyLabel, fileLabel, linkLabels,
}: {
  page: CvPage;
  emptyLabel: string;
  fileLabel: string;
  linkLabels: Record<string, string>;
}) {
  const list = (entries: Parameters<typeof CvEntryList>[0]["entries"]) => (
    <CvEntryList
      entries={entries}
      docsFolder={page.docsFolder}
      emptyLabel={emptyLabel}
      fileLabel={fileLabel}
      linkLabels={linkLabels}
    />
  );

  return (
    <div className="space-y-16">
      {page.sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-28">
          <h2 className="border-b-2 border-accent-500 pb-2">
            <span className="mr-2 text-accent-600">{section.code}.</span>
            {section.title}
          </h2>

          <div className="mt-8 space-y-10">
            {section.subsections.map((sub) => (
              <div key={sub.id} id={sub.id} className="scroll-mt-28">
                <h3 className="text-lg">
                  <span className="mr-2 text-slate-400">{sub.code}.</span>
                  {sub.title}
                </h3>
                {sub.intro && <p className="mt-1 text-sm text-slate-600">{sub.intro}</p>}

                <div className="mt-3">
                  {sub.lines && (
                    <address className="space-y-0.5 text-sm not-italic leading-relaxed text-slate-700">
                      {sub.lines.map((line, i) => (
                        <div key={i}>
                          {line.label && <span className="text-slate-500">{line.label}: </span>}
                          {line.url ? (
                            <a href={line.url} className="text-slate-800 hover:text-primary-700">{line.text}</a>
                          ) : (
                            line.text
                          )}
                        </div>
                      ))}
                    </address>
                  )}

                  {sub.linkTable && (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-300 text-xs uppercase tracking-wide text-slate-500">
                            <th scope="col" className="py-2 pr-6 font-semibold">{sub.linkTable.head[0]}</th>
                            <th scope="col" className="py-2 font-semibold">{sub.linkTable.head[1]}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sub.linkTable.rows.map((row) => (
                            <tr key={row.label} className="border-b border-slate-100 align-top">
                              <th scope="row" className="py-2 pr-6 font-normal text-slate-700">{row.label}</th>
                              <td className="py-2">
                                {row.urls.map((url) => (
                                  <a
                                    key={url}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block break-all text-slate-800 hover:text-primary-700"
                                  >
                                    {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                                  </a>
                                ))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {sub.entries && list(sub.entries)}

                  {sub.groups && (
                    <div className="space-y-6">
                      {sub.groups.map((group, gi) => (
                        <div key={group.id} id={group.id} className="scroll-mt-28">
                          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600">
                            {gi + 1}. {group.title}
                          </h4>
                          {list(group.entries)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
