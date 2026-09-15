import PageHeader from "@/components/public/PageHeader";
import StudentList from "@/components/public/StudentList";
import { prisma } from "@/lib/prisma";
import { STUDENT_CATEGORIES } from "@/types";

export const metadata = { title: "Students" };

export default async function StudentsPage() {
  const all = await prisma.student.findMany({ orderBy: [{ status: "asc" }, { startYear: "desc" }, { sortOrder: "asc" }] });
  return (
    <div className="container-page">
      <PageHeader title="Students" subtitle="PhD, MSc students and postdoctoral researchers I supervise or have supervised." />
      <div className="space-y-10">
        {STUDENT_CATEGORIES.map((cat) => {
          const list = all.filter((s) => s.category === cat.value);
          return (
            <section key={cat.value} id={cat.value} className="scroll-mt-24">
              <h2 className="mb-4">{cat.label} <span className="text-base text-slate-500 font-normal">({list.length})</span></h2>
              <StudentList students={list} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
