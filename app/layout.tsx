import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kamguru.com"),
  title: {
    default: "KAMguru | Key Account Management Consultancy & Training",
    template: "%s | KAMguru",
  },
  description:
    "KAMguru is the UK's leading key account management (KAM) consultancy — helping you build profitable partnerships with your most important customers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <TopBar />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
