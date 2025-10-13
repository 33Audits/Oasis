import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/providers/PrivyProvider";
import Navbar from "@/components/shared/navbar";
import SmoothScrolling from "@/components/shared/smooth-scrolling";
import { Toaster } from "@/components/ui/sonner";

const styreneA = localFont({
  src: [
    {
      path: "../fonts/StyreneA-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/StyreneA-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/StyreneA-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/StyreneA-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-styrene-a",
});

export const metadata: Metadata = {
  title: "Agent Launchpad",
  description: "A platform for launching agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${styreneA.className} ${styreneA.variable} antialiased text-foreground`}
      >
        <Providers>
          <SmoothScrolling>
            <Navbar />
            {children}
          </SmoothScrolling>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
