import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import TopLoader from "@/components/TopLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TazaKhabar",
  description: "Latest news article made by AbdSidd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopLoader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
