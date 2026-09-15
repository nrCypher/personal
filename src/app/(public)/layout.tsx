import { prisma } from "@/lib/prisma";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

async function getSettings() {
  return prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });
}

export default async function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />
      <main className="flex-1 py-10">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
