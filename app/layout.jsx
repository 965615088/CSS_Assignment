/*
Student Name: Wyse Lee Hong Yao
Changes Made: Added a global layout component to wrap the entire application with the EscapeKeyProvider.
*/

"use client";
import { Inter } from "next/font/google";
import "./globals.css"
import { EscapeKeyProvider } from "./components/EscapeKeyListener";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EscapeKeyProvider>
          {children}
        </EscapeKeyProvider>
      </body>
    </html>
  );
}
