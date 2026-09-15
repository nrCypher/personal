import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProject } from "@/lib/actions/projects";
import { prisma } from "@/lib/prisma";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idNum = Number(id);
  const project = await prisma.project.findUnique({ where: { id: idNum } });
  if (!project) notFound();
  async function action(formData: FormData) { "use server"; await updateProject(idNum, formData); }
  return (<div><AdminPageHeader title="Edit Project" /><ProjectForm action={action} project={project} submitLabel="Save Changes" /></div>);
}
