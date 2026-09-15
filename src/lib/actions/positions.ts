"use server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, reqStr, str, reqNum, numOpt, bool } from "./helpers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseData(fd: FormData) {
  return {
    title: reqStr(fd, "title"), institution: reqStr(fd, "institution"),
    department: str(fd, "department"), startYear: reqNum(fd, "startYear"),
    endYear: numOpt(fd, "endYear"), isCurrent: bool(fd, "isCurrent"),
    description: str(fd, "description"), sortOrder: numOpt(fd, "sortOrder") ?? 0,
  };
}

export async function createPosition(formData: FormData) {
  await requireAdmin();
  await prisma.position.create({ data: parseData(formData) });
  revalidatePath("/positions"); revalidatePath("/admin/positions");
  redirect("/admin/positions");
}

export async function updatePosition(id: number, formData: FormData) {
  await requireAdmin();
  await prisma.position.update({ where: { id }, data: parseData(formData) });
  revalidatePath("/positions"); revalidatePath("/admin/positions");
  redirect("/admin/positions");
}

export async function deletePosition(id: number) {
  await requireAdmin();
  await prisma.position.delete({ where: { id } });
  revalidatePath("/positions"); revalidatePath("/admin/positions");
}
