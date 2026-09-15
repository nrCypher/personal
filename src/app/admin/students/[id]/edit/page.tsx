import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StudentForm from "@/components/admin/StudentForm";
import { updateStudent } from "@/lib/actions/students";
import { prisma } from "@/lib/prisma";

export default async function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idNum = Number(id);
  const student = await prisma.student.findUnique({ where: { id: idNum } });
  if (!student) notFound();
  async function action(formData: FormData) { "use server"; await updateStudent(idNum, formData); }
  return (<div><AdminPageHeader title="Edit Student" /><StudentForm action={action} student={student} submitLabel="Save Changes" /></div>);
}
