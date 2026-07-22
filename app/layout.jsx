import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://growth-case-getsafe.vercel.app"),
  title: "Growth-Case Krankenversicherung · Bewerbungsarbeit Norbert Sommer",
  description:
    "Bewerbungsarbeit von Norbert Sommer: Growth-Funnel-Konzept Krankenversicherung mit zwei klickbaren Kampagnen-Demos.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Growth-Case Krankenversicherung",
    description:
      "Bewerbungsarbeit von Norbert Sommer: Growth-Funnel-Konzept mit zwei klickbaren Kampagnen-Demos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth-Case Krankenversicherung",
    description:
      "Bewerbungsarbeit von Norbert Sommer: Growth-Funnel-Konzept mit zwei klickbaren Kampagnen-Demos.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
