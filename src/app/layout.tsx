import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nrCypher | Personal Website",
  description:
    "Personal website and portfolio — developer, builder, problem solver.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-full bg-gray-950 text-gray-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
