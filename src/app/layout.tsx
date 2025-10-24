import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb Julan",
  description: "Book your vacations and stay anywhere you want",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${nunito.variable} antialiased `}>
        <NextTopLoader height={3} color="#ff5a5f" />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
