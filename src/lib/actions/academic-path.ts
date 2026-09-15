"use server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, reqStr, str, reqNum, numOpt } from "./helpers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseData(fd: FormData) {
  return {
    year: reqNum(fd, "year"), endYear: numOpt(fd, "endYear"),
    title: reqStr(fd, "title"), institution: reqStr(fd, "institution"),
    location: str(fd, "location"), description: str(fd, "description"),
    category: reqStr(fd, "category"), sortOrder: numOpt(fd, "sortOrder") ?? 0,
  };
}

export async function createAcademicPathEntry(formData: FormData) {
  await requireAdmin();
  await prisma.academicPathEntry.create({ data: parseData(formData) });
  revalidatePath("/academic-path"); revalidatePath("/admin/academic-path");
  redirect("/admin/academic-path");
}

export async function updateAcademicPathEntry(id: number, formData: FormData) {
  await requireAdmin();
  await prisma.academicPathEntry.update({ where: { id }, data: parseData(formData) });
  revalidatePath("/academic-path"); revalidatePath("/admin/academic-path");
  redirect("/admin/academic-path");
}

export async function deleteAcademicPathEntry(id: number) {
  await requireAdmin();
  await prisma.academicPathEntry.delete({ where: { id } });
  revalidatePath("/academic-path"); revalidatePath("/admin/academic-path");
}
