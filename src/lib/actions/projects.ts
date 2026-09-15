"use server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, reqStr, str, reqNum, numOpt } from "./helpers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseData(fd: FormData) {
  return {
    title: reqStr(fd, "title"), acronym: str(fd, "acronym"), role: str(fd, "role"),
    funder: str(fd, "funder"), reference: str(fd, "reference"),
    startYear: reqNum(fd, "startYear"), endYear: numOpt(fd, "endYear"),
    description: str(fd, "description"), url: str(fd, "url"),
    sortOrder: numOpt(fd, "sortOrder") ?? 0,
  };
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  await prisma.project.create({ data: parseData(formData) });
  revalidatePath("/projects"); revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: number, formData: FormData) {
  await requireAdmin();
  await prisma.project.update({ where: { id }, data: parseData(formData) });
  revalidatePath("/projects"); revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: number) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects"); revalidatePath("/admin/projects");
}
