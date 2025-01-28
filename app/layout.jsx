"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/ui/Navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Whack-A-Mole Game",
//   description: "Created by Wyse, Yu Hao, Ian, and Gerel",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/game";
  return (
    <html lang="en">
      <body className={inter.className}>
        {!hideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
