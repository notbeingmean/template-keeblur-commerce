import type { Metadata } from "next";

import "./globals.css";

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
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
