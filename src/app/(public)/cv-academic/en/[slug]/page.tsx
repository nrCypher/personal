import { notFound } from "next/navigation";
import CvPageView from "@/components/public/cv/CvPageView";
import { CV_ROUTES, routeBySlug } from "@/data/cv/routes";
import { buildCvPage } from "@/data/cv/pages/build";

export function generateStaticParams() {
  return CV_ROUTES.map((route) => ({ slug: route.en.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = routeBySlug("en", slug);
  return { title: route?.en.label ?? "Curriculum Vitae" };
}

export default async function CvAcademicEnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = routeBySlug("en", slug);
  const page = route && buildCvPage(route.key, "en");
  if (!page) notFound();
  return <CvPageView page={page} />;
}
