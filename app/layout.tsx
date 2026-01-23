import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs';


export const metadata: Metadata = {
  title: "Lumière - Premium Home Lighting & Decor",
  description: "Discover our curated collection of premium lighting and home decor. Transform your living spaces with elegant designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
