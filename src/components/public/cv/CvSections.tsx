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
