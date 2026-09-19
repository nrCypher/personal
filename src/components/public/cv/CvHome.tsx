import Image from "next/image";
import Link from "next/link";
import CvHeader from "./CvHeader";
import CvProfileLinks from "./CvProfileLinks";
import { CV_ROUTES, pageHref } from "@/data/cv/routes";
import { profile } from "@/data/cv/profile";
import { buildCvPage } from "@/data/cv/pages/build";
import { L, t } from "@/data/cv/pages/labels";
import type { Lang } from "@/data/cv/types";

/** How many entries this page holds, for the "N entries" hint on each card. */
const countEntries = (key: string, lang: Lang) => {
  const page = buildCvPage(key, lang);
  if (!page) return 0;
  return page.sections.reduce(
    (total, section) =>
      total +
      section.subsections.reduce(
        (n, sub) => n + (sub.entries?.length ?? 0) + (sub.groups?.reduce((g, grp) => g + grp.entries.length, 0) ?? 0),
        0
      ),
    0
  );
};

export default function CvHome({ lang }: { lang: Lang }) {
  const intro = profile.bio[lang][0];
  const cards = CV_ROUTES.filter((r) => r.key !== "contacts");

  return (
    <div>
      <CvHeader lang={lang} />

      <div className="mb-12 max-w-3xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Image
            src={profile.photo}
            alt={profile.name}
            width={128}
            height={128}
            priority
            className="h-32 w-32 flex-shrink-0 rounded-full object-cover ring-1 ring-slate-200"
          />
          <div>
            <h1 className="page-title">{profile.name}</h1>
            <p className="mt-1 text-sm uppercase tracking-[0.25em] text-accent-600">Curriculum Vitæ</p>
        <div className="mt-5">
          <CvProfileLinks />
        </div>
          </div>
        </div>
        <p className="mt-5 leading-relaxed text-slate-600">{intro}</p>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
          {profile.metrics[lang].map((metric) => (
            <div key={metric.label}>
              <dt className="text-xs uppercase tracking-wide text-slate-400">{metric.label}</dt>
              <dd className="text-xl font-semibold text-slate-900">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((route) => {
          const page = buildCvPage(route.key, lang);
          return (
            <Link
              key={route.key}
              href={pageHref(lang, route[lang].slug)}
              className="card no-underline transition-colors hover:border-accent-500"
            >
              <h2 className="mb-1 text-lg">{route[lang].label}</h2>
              {page?.subtitle && <p className="text-sm text-slate-600">{page.subtitle}</p>}
              <p className="mt-4 text-xs uppercase tracking-wide text-slate-400">
                {countEntries(route.key, lang)} {lang === "pt" ? "entradas" : "entries"}
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-accent-600">{t(L.viewMore, lang)} →</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-10">
        <Link href={pageHref(lang, CV_ROUTES.find((r) => r.key === "contacts")![lang].slug)} className="text-sm">
          {t(L.contactsTitle, lang)} →
        </Link>
      </div>
    </div>
  );
}
