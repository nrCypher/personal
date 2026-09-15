import PageHeader from "@/components/public/PageHeader";
import { prisma } from "@/lib/prisma";
import { yearRangeOrPresent } from "@/types";
import type { Position } from "@prisma/client";

export const metadata = { title: "Positions" };

export default async function PositionsPage() {
  const positions = await prisma.position.findMany({ orderBy: [{ isCurrent: "desc" }, { startYear: "desc" }, { sortOrder: "asc" }] });
  const current = positions.filter((p) => p.isCurrent || !p.endYear);
  const past = positions.filter((p) => !p.isCurrent && p.endYear);

  return (
    <div className="container-page">
      <PageHeader title="Positions" subtitle="Academic and professional positions held throughout my career." />
      {current.length > 0 && <section className="mb-10"><h2 className="mb-4">Current Positions</h2><ul className="space-y-4">{current.map((p) => <PositionItem key={p.id} position={p} />)}</ul></section>}
      {past.length > 0 && <section><h2 className="mb-4">Past Positions</h2><ul className="space-y-4">{past.map((p) => <PositionItem key={p.id} position={p} />)}</ul></section>}
      {positions.length === 0 && <p className="text-slate-500 italic">No positions added yet.</p>}
    </div>
  );
}

function PositionItem({ position }: { position: Position }) {
  return (
    <li className="card">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-primary-900">{position.title}</h3>
        <span className="text-sm font-medium text-slate-600">{yearRangeOrPresent(position.startYear, position.endYear)}</span>
      </div>
      <p className="text-slate-700 mt-1">{position.institution}{position.department && <span className="text-slate-600">, {position.department}</span>}</p>
      {position.description && <p className="text-sm text-slate-600 mt-2 leading-relaxed">{position.description}</p>}
    </li>
  );
}
