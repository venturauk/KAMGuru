import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kamguru.com"),
  title: {
    default: "KAMguru | Key Account Management Consultancy & Training",
    template: "%s | KAMguru",
  },
  description:
    "KAMguru is the UK's leading key account management (KAM) consultancy - helping you build profitable partnerships with your most important customers.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.kamguru.com",
    siteName: "KAMguru",
    title: "KAMguru | Key Account Management Consultancy & Training",
    description:
      "Develop profitable partnerships with your most important customers - KAM consultancy, training, coaching and speaking.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "KAMguru" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAMguru | Key Account Management Consultancy & Training",
    description:
      "Develop profitable partnerships with your most important customers - KAM consultancy, training, coaching and speaking.",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`h-full antialiased ${inter.variable} ${poppins.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <TopBar />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
