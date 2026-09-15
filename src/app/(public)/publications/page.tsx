import PageHeader from "@/components/public/PageHeader";
import PublicationList from "@/components/public/PublicationList";
import { prisma } from "@/lib/prisma";
import { PUBLICATION_CATEGORIES } from "@/types";

export const metadata = { title: "Publications" };

export default async function PublicationsPage() {
  const all = await prisma.publication.findMany({ orderBy: [{ year: "desc" }, { sortOrder: "asc" }] });
  const grouped = PUBLICATION_CATEGORIES.map((c) => ({ category: c, items: all.filter((p) => p.category === c.value) }));
  return (
    <div className="container-page">
      <PageHeader title="Publications" subtitle="Journal articles, conference papers, book chapters, and edited books." />
      <nav className="flex flex-wrap gap-2 mb-10 border-b border-slate-200 pb-3">
        {grouped.map(({ category, items }) => (
          <a key={category.value} href={`#${category.value}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-primary-50 text-sm text-slate-700 no-underline">
            {category.label}<span className="text-xs bg-white border border-slate-200 rounded-full px-2 py-0.5">{items.length}</span>
          </a>
        ))}
      </nav>
      <div className="space-y-12">
        {grouped.map(({ category, items }) => (
          <section key={category.value} id={category.value} className="scroll-mt-24">
            <h2 className="mb-5">{category.label}</h2>
            <PublicationList publications={items} />
          </section>
        ))}
      </div>
    </div>
  );
}
