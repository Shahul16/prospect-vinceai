import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prospect VinceAI — Outbound workspace",
  description: "Research prospects, personalise outreach and manage sales campaigns with AI assistance."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
