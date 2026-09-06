import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Task Manager",
  description: "Manage your daily student tasks easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}