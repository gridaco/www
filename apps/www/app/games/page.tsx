import type { Metadata } from "next";
import { site } from "../../site.config";

export const metadata: Metadata = {
  title: "Games",
  alternates: { canonical: site.url("/games") },
  robots: { index: site.isPublished("/games"), follow: true },
};

export default function GamesPage() {
  return (
    <main className="min-h-screen p-8 sm:p-12">
      <h1 className="text-2xl font-medium">Games</h1>
    </main>
  );
}
