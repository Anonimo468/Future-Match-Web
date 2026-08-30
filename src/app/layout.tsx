import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Placeholder mientras se licencia Avenir/Avenir Light (fuente de pago).
// Poppins es la sustituta más cercana disponible en Google Fonts.
const avenirFallback = Poppins({
  variable: "--font-avenir-fallback",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Future Match — Descubre tu camino",
  description:
    "Future Match usa inteligencia artificial para orientarte vocacionalmente y ayudarte a tomar decisiones más acertadas sobre tu futuro académico y profesional.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${avenirFallback.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
