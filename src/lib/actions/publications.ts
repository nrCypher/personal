"use server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, reqStr, str, reqNum, numOpt } from "./helpers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseData(fd: FormData) {
  return {
    category: reqStr(fd, "category"), authors: reqStr(fd, "authors"),
    title: reqStr(fd, "title"), venue: str(fd, "venue"), volume: str(fd, "volume"),
    pages: str(fd, "pages"), year: reqNum(fd, "year"), doi: str(fd, "doi"),
    url: str(fd, "url"), abstract: str(fd, "abstract"), sortOrder: numOpt(fd, "sortOrder") ?? 0,
  };
}

export async function createPublication(formData: FormData) {
  await requireAdmin();
  await prisma.publication.create({ data: parseData(formData) });
  revalidatePath("/publications"); revalidatePath("/admin/publications");
  redirect("/admin/publications");
}

export async function updatePublication(id: number, formData: FormData) {
  await requireAdmin();
  await prisma.publication.update({ where: { id }, data: parseData(formData) });
  revalidatePath("/publications"); revalidatePath("/admin/publications");
  redirect("/admin/publications");
}

export async function deletePublication(id: number) {
  await requireAdmin();
  await prisma.publication.delete({ where: { id } });
  revalidatePath("/publications"); revalidatePath("/admin/publications");
}
