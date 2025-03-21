import Providers from "@/components/providers";
import { TConfig } from "@/stores/config";
import "@/styles/globals.css";
import { cn } from "@/utils/classname";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import localFont from "next/font/local";

const fontGlancyr = localFont({
  src: [
    {
      path: "../../public/fonts/Glancyr/Glancyr-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Glancyr/Glancyr-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/Glancyr/Glancyr-Semibold.otf",
      weight: "600",
    },
    {
      path: "../../public/fonts/Glancyr/Glancyr-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-glancyr",
});

const fontBeVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
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
          fontGlancyr.variable,
          fontBeVietnamPro.variable,
          `font-be-vietnam-pro bg-[#F7FAFC] antialiased`,
        )}
      >
        <Providers config={config as TConfig}>{children}</Providers>
      </body>
    </html>
  );
}
