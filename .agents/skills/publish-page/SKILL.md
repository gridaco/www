---
name: publish-page
description: Add, change, move, remove, or publish authored Grida website pages in gridaco/www, including metadata, discovery, and the separate parent-site routing handoff.
---

# Publish a Grida page

This repository owns authored public experiences under `/index`. Read the repository README and CONTRIBUTING guide for the current topology. The application lives in top-level `www/`, which is also the Vercel project’s Root Directory; workspace and Turborepo commands run from the repository root. Use `www/site.config.ts` as the authority for the `site` object, page registry, and URL helpers; inspect its current API before editing consumers.

## Keep URL ownership explicit

- The canonical public origin is `https://grida.co`; the child app uses native Next.js `basePath: "/index"` and `trailingSlash: false`.
- A Vercel deployment origin is the upstream host, and a local origin is for development. Neither becomes the canonical URL.
- Next.js base-path handling does not supply correct metadata or parent links automatically. Use the site helpers and registry, keep child paths prefixed once, and link to other applications through their canonical public URLs.
- Existing `/index/canvas` and its descendants stay parent-owned. `/fx` stays with [gridaco/fx](https://github.com/gridaco/fx/tree/main/www).
- Do not use the authenticated editor’s `host/url.ts` or universal auth aliases for marketing URLs. Requests through `grida.co` still pass through the parent’s proxy and maintenance behavior.

## Change the page and its discovery together

Keep route files, registry entries, canonical/social metadata, and child sitemap entries aligned. For moves or removals, account for incoming links and redirects. Use the smallest change that achieves the requested experience; a new page does not imply a shared runtime UI package, a copied parent header/footer, a game engine dependency, or a new CDN.

The initial API is `site.url("/games")` for the absolute public URL, `site.homeUrl` for the parent home, and `site.publications` for indexable `{ path: "/games" }` entries. Page metadata derives `robots.index` from `site.isPublished("/games")`; the sitemap reads the same registry. Root metadata defaults to `noindex`, so configure real page metadata explicitly.

The initial `/index/games` route is a nearly blank setup placeholder: `noindex`, excluded from the child sitemap, and unadvertised. `/index` temporarily redirects with HTTP 307 to `https://grida.co/home`. Introduce indexable discovery when real content is ready. This application has no separate robots route; the parent’s `/robots.txt` owns the host’s crawl policy.

Preserve the curated-artifact boundary: page code consumes selected releases from the owning source project or published storage. Do not rerun generation or turn manually selected run snapshots into a CI generation job as part of publishing a page.

## Hand off parent changes in a separate PR

Inspect the current owning files in [gridaco/grida](https://github.com/gridaco/grida); change only the surfaces affected by this request. Parent integration is a separate PR and merge step, not a script that this repository silently performs.

| Parent source                                                                                                                                                                                         | When it matters                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`editor/next.config.ts`](https://github.com/gridaco/grida/blob/main/editor/next.config.ts) and [`editor/next.config.test.ts`](https://github.com/gridaco/grida/blob/main/editor/next.config.test.ts) | Ingress rewrites, route ownership, redirects, and exact-root versus descendant behavior. Preserve the `/index/canvas` exception and test the public path with `/index` preserved upstream. |
| [`editor/www/data/sitemap.ts`](https://github.com/gridaco/grida/blob/main/editor/www/data/sitemap.ts)                                                                                                 | Main-site navigation `links` and `items`. Despite its name, this is not the XML sitemap.                                                                                                   |
| [`editor/www/header.tsx`](https://github.com/gridaco/grida/blob/main/editor/www/header.tsx) and [`editor/www/footer.tsx`](https://github.com/gridaco/grida/blob/main/editor/www/footer.tsx)           | Visible parent navigation placement; a data entry alone may not expose a link.                                                                                                             |
| [`editor/app/sitemap.ts`](https://github.com/gridaco/grida/blob/main/editor/app/sitemap.ts)                                                                                                           | Parent-owned XML sitemap entries. Do not duplicate child-owned pages here; the child publishes its own indexable entries.                                                                  |
| [`editor/app/robots.txt`](https://github.com/gridaco/grida/blob/main/editor/app/robots.txt)                                                                                                           | Register the public child sitemap once indexable pages exist. Keep the blank setup page unadvertised.                                                                                      |
| [`editor/env.ts`](https://github.com/gridaco/grida/blob/main/editor/env.ts)                                                                                                                           | Parent canonical-origin and public URL configuration when needed.                                                                                                                          |

The initial parent draft PR activates the subtree when merged. After that, ordinary website commits deploy through this repository’s Vercel Git integration; another parent PR is needed only when parent-owned routing or discovery changes. Continue within the user’s existing authorization and scope; this workflow does not introduce another approval gate.

## Verify and report the result

Run the repository’s relevant checks. For route changes, inspect the direct child deployment and the public parent path, including assets, links, redirects, canonical/social URLs, indexability, and sitemap behavior. Preview or local availability alone does not prove public activation.

Report the public route, indexability, deployment status, selected artifact dependencies, and any separate parent PR still needed or awaiting merge. Do not claim activation until the parent path is observed working. In committed documentation, reference other repositories through public GitHub `main` URLs rather than machine-local checkout paths.
