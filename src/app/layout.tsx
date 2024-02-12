import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { LIGHT_THEME } from "@/app/lib/constants";

// const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin Dashboard | iCONIC",
  description: "iCONIC Admin Dashboard for managing the eCommerce store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={getCookie("theme", { cookies }) || LIGHT_THEME}>
      <body className={`${poppins.variable}`}>{children}</body>
    </html>
  );
}
