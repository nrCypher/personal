import CvHeader from "./CvHeader";
import CvToc from "./CvToc";
import CvSections from "./CvSections";
import { L, linkLabels, t } from "@/data/cv/pages/labels";
import type { CvPage } from "@/data/cv/types";

export default function CvPageView({ page }: { page: CvPage }) {
  const lang = page.lang;
  return (
    <div>
      <CvHeader lang={lang} slug={page.slug} />
      <h1 className="page-title">{page.title}</h1>
      {page.subtitle && <p className="page-subtitle mb-10">{page.subtitle}</p>}

      <div className="grid items-start gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <CvToc sections={page.sections} label={t(L.contents, lang)} />
        <div>
          <CvSections
            page={page}
            emptyLabel={t(L.noEntries, lang)}
            fileLabel={t(L.document, lang)}
            linkLabels={linkLabels(lang)}
          />
        </div>
      </div>
    </div>
  );
}
