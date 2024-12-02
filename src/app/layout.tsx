import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Keeblur - Keep your blur",
  description: "Keeblur is a ecommerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Toaster richColors position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
