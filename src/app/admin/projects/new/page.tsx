import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/actions/projects";
export default function NewProjectPage() { return (<div><AdminPageHeader title="New Project" /><ProjectForm action={createProject} submitLabel="Create" /></div>); }
