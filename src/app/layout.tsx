import Providers from "@/components/providers";
import { TConfig } from "@/stores/config";
import "@/styles/globals.css";
import { cn } from "@/utils/classname";
import type { Metadata } from "next";
import { Urbanist, Work_Sans } from "next/font/google";

const fontWorkSans = Work_Sans({
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const fontUrbanist = Urbanist({
  variable: "--font-urbanist",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project XO",
  description: "Project XO",
  openGraph: {
    title: "Project XO",
    description: "",
    url: "",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "",
    description: "",
    images: [""],
  },
  icons: {
    icon: "",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = {
    title: metadata?.title,
    description: metadata?.description,
  };

  return (
    <html lang="en">
      <body
        className={cn(
          fontWorkSans.variable,
          fontUrbanist.variable,
          `font-urbanist antialiased`,
        )}
      >
        <Providers config={config as TConfig}>{children}</Providers>
      </body>
    </html>
  );
}
