import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "../site.config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: "Grida",
    template: "%s — Grida",
  },
  robots: { index: false, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
