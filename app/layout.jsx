import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar3 from "../components/Navbar3";
import Footer from "../components/Footer";
import { AppProvider } from "../context/AppContext";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { Montserrat } from 'next/font/google';
import { Arimo } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const arimo = Arimo({
  subsets: ['latin'],
  variable: '--font-arimo',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: "AryanShakti",
  description: "Discover everything for a good health right here. Find wellness, cure, herbs, and more to ensure your companion thrives.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${arimo.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProvider>

        <Navbar3/>
        {children}
         <Toaster position="top-right" />
        <Footer/>
        <Script
          src="https://cdn.jotfor.ms/agent/embedjs/019d90baca5d75b69487c9e49eb90ccbfcf7/embed.js"
          strategy="afterInteractive"
        />
        </AppProvider>
        </body>
    </html>
  );
}
