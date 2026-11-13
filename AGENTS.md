# Grida WWW Index

Read [README.md](README.md) for the public introduction and [CONTRIBUTING.md](CONTRIBUTING.md) for topology, setup, and release conventions before changing the site. Check for a nearer `README.md` or `AGENTS.md` when entering an unfamiliar directory.

- WWW Index owns authored public Grida experiences in the new `/index` subtree. The repository remains `gridaco/www`; the Vercel project is `grida-www-index`. It is not tied to a single product or business framing. Existing `/index/canvas` routes remain in the parent repository; FX keeps `/fx`.
- The application lives in top-level `www/`; Vercel’s Root Directory is `www`, while workspace and Turborepo commands run from the repository root. `www/site.config.ts` owns the `site` object, page registry, and URL helpers. Keep canonical `https://grida.co`, native `/index`, Vercel upstream, and local origins distinct.
- Apply [publish-page](.agents/skills/publish-page/SKILL.md) when adding, changing, moving, removing, or publishing a page. Public ingress and main-site discovery changes belong in a separate [gridaco/grida](https://github.com/gridaco/grida) PR.
- Keep the setup `/index/games` placeholder `noindex`, out of navigation and the sitemap until it contains publishable content. `/index` uses a temporary 307 redirect to `https://grida.co/home`.
- Preserve manually curated artifact publication. Website builds do not generate game assets or provision a CDN. Source projects and large artifacts retain their own owners.
- Do not import the authenticated editor’s `host/url.ts` or route public marketing through universal auth aliases. The parent’s proxy and maintenance behavior continues to apply.
- Parent ingress uses `WWW_INDEX_URL` / `NEXT_PUBLIC_WWW_INDEX_URL` for `https://grida-www-index.vercel.app`, without the `/index` path. Public canonical URLs stay on `https://grida.co/index`.
- Do not copy the parent header/footer or introduce a shared runtime UI package as incidental setup work.
- Reuse the local Grida logo, favicon, and symbol/wordmark assets; [CONTRIBUTING.md](CONTRIBUTING.md#brand-assets) records their sources and base-path conventions. Keep copied artwork aligned with Grida rather than redrawing it.
- Run the root typecheck, lint, and build commands appropriate to the change. Validate the served `/index` paths when editing routing or metadata.
- In committed docs, use public GitHub `main` links for cross-repository references. Do not include machine-specific paths or private operational data.
