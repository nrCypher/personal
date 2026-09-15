"use server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, str } from "./helpers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateSettings(formData: FormData) {
  await requireAdmin();
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      fullName: str(formData, "fullName"), title: str(formData, "title"),
      institution: str(formData, "institution"), department: str(formData, "department"),
      bio: str(formData, "bio"), profilePhotoUrl: str(formData, "profilePhotoUrl"),
      email: str(formData, "email"), phone: str(formData, "phone"),
      address: str(formData, "address"), googleScholarUrl: str(formData, "googleScholarUrl"),
      orcidUrl: str(formData, "orcidUrl"), researchGateUrl: str(formData, "researchGateUrl"),
      linkedinUrl: str(formData, "linkedinUrl"), githubUrl: str(formData, "githubUrl"),
      researchInterests: str(formData, "researchInterests"),
    },
    create: {
      id: 1, fullName: str(formData, "fullName"), title: str(formData, "title"),
      institution: str(formData, "institution"), department: str(formData, "department"),
      bio: str(formData, "bio"), profilePhotoUrl: str(formData, "profilePhotoUrl"),
      email: str(formData, "email"), phone: str(formData, "phone"),
      address: str(formData, "address"), googleScholarUrl: str(formData, "googleScholarUrl"),
      orcidUrl: str(formData, "orcidUrl"), researchGateUrl: str(formData, "researchGateUrl"),
      linkedinUrl: str(formData, "linkedinUrl"), githubUrl: str(formData, "githubUrl"),
      researchInterests: str(formData, "researchInterests"),
    },
  });
  revalidatePath("/", "layout");
  redirect("/admin/settings?ok=1");
}
