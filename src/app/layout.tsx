import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/website-ui/header";
import GTag from "@/components/gtag";
import AuthWall from "@/components/auth/auth-wall";

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
  const isDevBranch = process.env.VERCEL_GIT_REPO_SLUG === "dev";
  return (
    <html lang="en">
      <body className={`${urbanist.className} snap-y snap-mandatory`}>
        <GTag />
        {isDevBranch ? (
          <AuthWall client="oscar-tango">
            <Header />
            {process.env.VERCEL_GIT_REPO_SLUG}
            {children}
          </AuthWall>
        ) : (
          <>
            <Header />
            {process.env.VERCEL_GIT_REPO_SLUG}

            {children}
          </>
        )}
        <Analytics />
      </body>
    </html>
  );
}
