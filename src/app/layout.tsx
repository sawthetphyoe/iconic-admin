import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { LIGHT_THEME } from "@/lib/constants";
import QueryWrapper from "@/components/context/QueryWrapper";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "@/components/context/StoreProvider";
import ToastWrapper from "@/components/context/ToastWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin Dashboard | iCONIC",
  description: "Admin Dashboard for managing the iCONIC Apple Products Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={getCookie("theme", { cookies }) || LIGHT_THEME}>
      <QueryWrapper>
        <StoreProvider>
          <ToastWrapper>
            <body className={`${poppins.variable}`}>{children}</body>
          </ToastWrapper>
        </StoreProvider>
      </QueryWrapper>
    </html>
  );
}
