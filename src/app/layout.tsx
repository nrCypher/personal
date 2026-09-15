import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Personal Academic Website", template: "%s | Personal Academic Website" },
  description: "Personal academic website",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
