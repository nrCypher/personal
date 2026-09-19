import Link from "next/link";
import type { Lang } from "@/data/cv/types";
import { CV_ROUTES, alternateHref, homeHref, pageHref } from "@/data/cv/routes";
import { profile } from "@/data/cv/profile";

/**
 * Single-level menu mirroring the reference site, plus a PT/EN switcher that
 * always lands on the equivalent page.
 */
export default function CvHeader({ lang, slug }: { lang: Lang; slug?: string }) {
  const other: Lang = lang === "pt" ? "en" : "pt";

  return (
    <div className="mb-10 border-b border-slate-200 pb-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <Link href={homeHref(lang)} className="no-underline">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">{profile.name}</span>
          <span className="ml-2 text-xs text-slate-400">Curriculum Vitæ</span>
        </Link>
        <div className="flex items-center gap-1 text-xs">
          <span className={lang === "pt" ? "font-semibold text-slate-900" : "text-slate-400"}>PT</span>
          <span className="text-slate-300">/</span>
          <Link href={alternateHref(lang, slug)} className="text-slate-400 no-underline hover:text-primary-700" hrefLang={other}>
            <span className={lang === "en" ? "font-semibold text-slate-900" : ""}>EN</span>
          </Link>
        </div>
      </div>

      <nav aria-label="CV" className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
        {CV_ROUTES.map((route) => {
          const active = slug === route[lang].slug;
          return (
            <Link
              key={route.key}
              href={pageHref(lang, route[lang].slug)}
              aria-current={active ? "page" : undefined}
              className={`text-sm no-underline ${
                active ? "font-semibold text-accent-600" : "text-slate-600 hover:text-primary-700"
              }`}
            >
              {route[lang].label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
