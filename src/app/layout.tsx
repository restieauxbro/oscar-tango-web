import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/website-ui/header";
import GTag from "@/components/gtag";
import AuthWall from "@/components/auth/auth-wall";
import { isDev } from "@/lib/utils";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oscar Tango",
  description: "AI solutions for the future of work",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dev = isDev();
  return (
    <html lang="en">
      <body className={`${urbanist.className} snap-y snap-mandatory`}>
        <GTag />
        {dev ? (
          <AuthWall client="oscar-tango">
            <Header />
            {children}
          </AuthWall>
        ) : (
          <>
            <Header />
            {children}
          </>
        )}
        <Analytics />
      </body>
    </html>
  );
}
