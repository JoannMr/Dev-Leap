// app/layout.tsx

import { ClerkProvider } from "@clerk/nextjs"; // <-- Importa ClerkProvider
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DevLeap",
  description: "Plataforma de cursos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <ClerkProvider>
        <body className={`${outfit.variable} font-sans`}>
          <Header />
          {children}
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}
