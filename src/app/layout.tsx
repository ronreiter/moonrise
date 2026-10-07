import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moonrisetlv.com"),
  title: {
    default: "Moonrise — Yoga, Pilates & Sound in Tel Aviv",
    template: "%s · Moonrise",
  },
  description:
    "Moonrise is a calm yoga, pilates and sound studio in Tel Aviv. Slow flows, strong flows, yin, reiki, sound baths and cacao evenings — and space to land.",
  keywords: [
    "yoga Tel Aviv",
    "pilates Tel Aviv",
    "sound bath Tel Aviv",
    "yin yoga",
    "reiki",
    "yoga nidra",
    "Moonrise studio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://moonrisetlv.com",
    siteName: "Moonrise",
    title: "Moonrise — Yoga, Pilates & Sound in Tel Aviv",
    description:
      "A calm studio for movement and deep rest in Tel Aviv — yoga, pilates, sound evenings and space to land.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moonrise — Yoga, Pilates & Sound in Tel Aviv",
    description:
      "A calm studio for movement and deep rest in Tel Aviv — yoga, pilates, sound evenings and space to land.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f2e9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body className="bg-ivory font-sans text-ink antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.setAttribute("data-js","")',
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
