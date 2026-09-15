"use server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, reqStr, str, numOpt } from "./helpers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseData(fd: FormData) {
  return {
    authors: reqStr(fd, "authors"), title: reqStr(fd, "title"),
    patentNumber: reqStr(fd, "patentNumber"), date: reqStr(fd, "date"),
    country: str(fd, "country"), description: str(fd, "description"),
    url: str(fd, "url"), sortOrder: numOpt(fd, "sortOrder") ?? 0,
  };
}

export async function createPatent(formData: FormData) {
  await requireAdmin();
  await prisma.patent.create({ data: parseData(formData) });
  revalidatePath("/patents"); revalidatePath("/admin/patents");
  redirect("/admin/patents");
}

export async function updatePatent(id: number, formData: FormData) {
  await requireAdmin();
  await prisma.patent.update({ where: { id }, data: parseData(formData) });
  revalidatePath("/patents"); revalidatePath("/admin/patents");
  redirect("/admin/patents");
}

export async function deletePatent(id: number) {
  await requireAdmin();
  await prisma.patent.delete({ where: { id } });
  revalidatePath("/patents"); revalidatePath("/admin/patents");
}
