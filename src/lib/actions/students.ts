"use server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, reqStr, str, reqNum, numOpt } from "./helpers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseData(fd: FormData) {
  return {
    name: reqStr(fd, "name"), category: reqStr(fd, "category"),
    thesisTitle: str(fd, "thesisTitle"), startYear: reqNum(fd, "startYear"),
    endYear: numOpt(fd, "endYear"), status: str(fd, "status") || "ongoing",
    coSupervisor: str(fd, "coSupervisor"), institution: str(fd, "institution"),
    sortOrder: numOpt(fd, "sortOrder") ?? 0,
  };
}

export async function createStudent(formData: FormData) {
  await requireAdmin();
  await prisma.student.create({ data: parseData(formData) });
  revalidatePath("/students"); revalidatePath("/admin/students");
  redirect("/admin/students");
}

export async function updateStudent(id: number, formData: FormData) {
  await requireAdmin();
  await prisma.student.update({ where: { id }, data: parseData(formData) });
  revalidatePath("/students"); revalidatePath("/admin/students");
  redirect("/admin/students");
}

export async function deleteStudent(id: number) {
  await requireAdmin();
  await prisma.student.delete({ where: { id } });
  revalidatePath("/students"); revalidatePath("/admin/students");
}
