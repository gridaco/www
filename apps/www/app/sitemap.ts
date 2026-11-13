import type { MetadataRoute } from "next";
import { site } from "../site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return site.publications.map((publication) => ({
    url: site.url(publication.path),
  }));
}
