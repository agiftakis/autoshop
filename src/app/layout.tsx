// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import PublicLayout from "@/custom-layouts/public";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Atlantic Tires, Rims & Auto Repair | Jacksonville, FL",
  description:
    "New and used tires, rims, brakes, alignments, A/C service, oil changes and full auto repair at 7533 Atlantic Blvd, Jacksonville, FL 32211. Call (904) 647-9284.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="antialiased">
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}