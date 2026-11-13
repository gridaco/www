type Publication = Readonly<{ path: `/${string}` }>;

// Only reviewed, indexable pages belong here. Draft pages remain accessible by URL.
const publications: readonly Publication[] = [];

export const site = {
  origin: "https://grida.co",
  basePath: "/index",
  homeUrl: "https://grida.co/home",
  publications,
  url(path: "" | `/${string}` = ""): string {
    return new URL(`${site.basePath}${path}`, site.origin).href;
  },
  isPublished(path: `/${string}`): boolean {
    return site.publications.some((publication) => publication.path === path);
  },
} as const;
