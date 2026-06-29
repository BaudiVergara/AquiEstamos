import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AquíEstamos",
  description:
    "Plataforma ciudadana para reportar personas atrapadas durante emergencias.",

  openGraph: {
  title: "AquíEstamos",
  description:
    "Plataforma ciudadana para reportar personas atrapadas durante emergencias.",
  siteName: "AquíEstamos",
  locale: "es_VE",
  type: "website",
  images: [
    {
      url: "/ve.png",
      width: 512,
      height: 512,
      alt: "AquíEstamos",
    },
  ],
},

  twitter: {
  card: "summary_large_image",
  title: "AquíEstamos",
  description:
    "Plataforma ciudadana para reportar personas atrapadas durante emergencias.",
  images: ["/ve.png"],
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
