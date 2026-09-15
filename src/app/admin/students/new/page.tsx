import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StudentForm from "@/components/admin/StudentForm";
import { createStudent } from "@/lib/actions/students";
export default function NewStudentPage() { return (<div><AdminPageHeader title="New Student" /><StudentForm action={createStudent} submitLabel="Create" /></div>); }
