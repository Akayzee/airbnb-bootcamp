import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "../../globals.css";
import Navbar from "@/components/desktop/Navbar";
import Container from "@/components/Container";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import AuthCard from "@/components/auth/AuthCard";
import { SessionProvider } from "next-auth/react";
import AuthDialog from "@/components/auth/AuthDialog";
import HostingNavbar from "@/components/desktop/hosting/HostingNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb Julan",
  description: "Book your vacations and stay anywhere you want",
};

export default function HostingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthDialog />
      <div className="hidden md:block">
        <HostingNavbar />
      </div>
      <div className="md:mt-30">
        <Container>
          <div className="min-h-dvh">{children}</div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
