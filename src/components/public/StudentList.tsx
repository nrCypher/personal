import type { Student } from "@prisma/client";
import { yearRangeOrPresent } from "@/types";

export default function StudentList({ students }: { students: Student[] }) {
  if (students.length === 0) return <p className="text-slate-500 italic">No entries yet.</p>;
  return (
    <ul className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
      {students.map((s) => (
        <li key={s.id} className="p-4 hover:bg-slate-50">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-900">{s.name}</span>
                {s.status === "completed" ? <span className="badge-completed">Completed</span> : s.status === "ongoing" ? <span className="badge-current">Ongoing</span> : null}
              </div>
              {s.thesisTitle && <p className="text-sm text-slate-700 italic mt-1">&ldquo;{s.thesisTitle}&rdquo;</p>}
              <div className="text-xs text-slate-500 mt-1">
                {yearRangeOrPresent(s.startYear, s.endYear)}
                {s.institution && <> &middot; {s.institution}</>}
                {s.coSupervisor && <> &middot; Co-supervisor: {s.coSupervisor}</>}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
