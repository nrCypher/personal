"use client";
import { useEffect, useState } from "react";
import type { CvSection } from "@/data/cv/types";

export default function CvToc({ sections, label }: { sections: CvSection[]; label: string }) {
  const ids = sections.flatMap((s) => [s.id, ...s.subsections.map((x) => x.id)]);
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (record.isIntersecting) visible.add(record.target.id);
          else visible.delete(record.target.id);
        }
        // Document order, so the topmost visible heading wins.
        const first = ids.find((id) => visible.has(id));
        if (first) setActive(first);
      },
      { rootMargin: "-112px 0px -70% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // `ids` is derived from `sections`, which is static for a given page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  const list = (
    <ul className="space-y-3 text-sm">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className={`block font-semibold no-underline ${
              active === section.id ? "text-accent-600" : "text-slate-800 hover:text-primary-700"
            }`}
          >
            {section.code}. {section.title}
          </a>
          <ul className="mt-1.5 space-y-1 border-l border-slate-200 pl-3">
            {section.subsections.map((sub) => (
              <li key={sub.id}>
                <a
                  href={`#${sub.id}`}
                  className={`block text-xs leading-snug no-underline ${
                    active === sub.id ? "font-medium text-accent-600" : "text-slate-500 hover:text-primary-700"
                  }`}
                >
                  {sub.code} {sub.title}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <details className="card mb-8 lg:hidden">
        <summary className="cursor-pointer text-sm font-semibold">{label}</summary>
        <div className="mt-4">{list}</div>
      </details>

      <nav
        aria-label={label}
        className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 lg:block"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        {list}
      </nav>
    </>
  );
}
