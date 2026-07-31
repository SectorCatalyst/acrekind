import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Manrope({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://acrekind.com"),
  title: "Acrekind — A field planner for planted places",
  description: "Build a practical starting palette of hardy plants from the light, moisture, space and hardiness zone of your garden.",
  openGraph: {
    title: "Acrekind — Plan a patch that belongs there",
    description: "A small field guide and planting planner for thoughtful cold-climate gardens.",
    url: "https://acrekind.com",
    siteName: "Acrekind",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#2a3024", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
