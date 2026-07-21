import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Growth-Case Krankenversicherung · Bewerbungsarbeit Norbert Sommer",
  description:
    "Bewerbungsarbeit von Norbert Sommer: Growth-Funnel-Konzept Krankenversicherung mit zwei klickbaren Kampagnen-Demos.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
