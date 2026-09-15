import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AcademicPathForm from "@/components/admin/AcademicPathForm";
import { createAcademicPathEntry } from "@/lib/actions/academic-path";

export default function NewAcademicPathEntryPage() {
  return (<div><AdminPageHeader title="New Academic Path Entry" /><AcademicPathForm action={createAcademicPathEntry} submitLabel="Create" /></div>);
}
