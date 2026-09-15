import PageHeader from "@/components/public/PageHeader";
import Timeline from "@/components/public/Timeline";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Academic Path" };

export default async function AcademicPathPage() {
  const entries = await prisma.academicPathEntry.findMany({ orderBy: [{ year: "desc" }, { sortOrder: "asc" }] });
  return (
    <div className="container-page">
      <PageHeader title="Academic Path" subtitle="Degrees, habilitation, career milestones and awards in chronological order." />
      <Timeline entries={entries} />
    </div>
  );
}
