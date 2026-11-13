# Grida WWW

Public, authored Grida pages: launches, presentations, demos, showcases, and other marketing experiences that need their own composition and release cycle.

This repository owns the new `https://grida.co/index` subtree. Its scope follows the public experience rather than a particular product or industry; a page may introduce Grida FX today and a broader Grida workflow later.

## Ownership and routing

| Surface                                      | Owner                                                         | Delivery                                                                                               |
| -------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `grida.co` and existing public routes        | [gridaco/grida](https://github.com/gridaco/grida)             | The parent Next.js app receives requests and owns the ingress configuration.                           |
| New `/index` pages                           | This repository, `apps/www`                                   | An independent Vercel deployment, reached through parent rewrites that preserve `/index`.              |
| Existing `/index/canvas` and its descendants | [gridaco/grida](https://github.com/gridaco/grida)             | Explicitly retained by the parent; the new subtree does not transfer this existing route.              |
| `/fx`                                        | [gridaco/fx](https://github.com/gridaco/fx/tree/main/www)     | FX keeps its own website and deployment.                                                               |
| Game source and generated showcase artifacts | Their authoring repositories and separately published storage | A page consumes a selected release; publishing or building the page does not generate new game assets. |

The public URL, Git repository, web deployment, and artifact storage are separate decisions. Adding a page here does not move its originating project into this repository. Future game builds and media can use manually curated CDN releases; this scaffold provisions no bucket or publishing pipeline.

The parent’s existing proxy and maintenance behavior still applies to requests through `grida.co`. This site does not bypass that ingress or use the authenticated editor’s host and universal-route helpers.

## Current state

- `/index` temporarily redirects to `https://grida.co/home` with HTTP 307.
- `/index/games` is an almost blank setup placeholder, marked `noindex` and omitted from discovery. It is not the games landing page.
- The child sitemap contains no entries. The parent’s `/robots.txt` remains authoritative for `grida.co`; there is no separate child robots route.
- Parent routing activation is delivered as a separate draft PR. Merging that PR activates the public subtree. Later ordinary website changes deploy through this repository’s Vercel Git integration.

There is no game runtime, copied Grida header/footer, shared runtime UI package, CDN provisioning, or production content refinement in this initial setup.

## Develop

Use Node.js 24 and pnpm 11.5.2. The repository uses a pnpm workspace and Turborepo, with one application in `apps/www`.

```sh
pnpm install
pnpm hooks:install
pnpm dev
```

Open [http://127.0.0.1:3100/index/games](http://127.0.0.1:3100/index/games). `/index` redirects to the public Grida home page even during local development. This scaffold needs no environment file.

See [CONTRIBUTING.md](CONTRIBUTING.md) for checks, page conventions, and the cross-repository release workflow. The [publish-page skill](.agents/skills/publish-page/SKILL.md) carries the operational checklist for adding, changing, moving, removing, and publishing pages.

## URL configuration

[`apps/www/site.config.ts`](apps/www/site.config.ts) exports the `site` object and is the authority for the site identity, URL helpers, and page registry. Keep these values distinct:

| Value                                   | Purpose                                                               |
| --------------------------------------- | --------------------------------------------------------------------- |
| `https://grida.co`                      | Canonical public origin used in metadata and public links.            |
| `/index`                                | Native Next.js `basePath`, with `trailingSlash: false`.               |
| The production Vercel deployment origin | Upstream target for the parent rewrite, not the public canonical URL. |
| The local server origin                 | Development and verification, not published metadata.                 |

Next.js applies `basePath` to its routing, assets, and supported link helpers. It does not construct correct metadata, prefix every literal URL, or decide which links belong to the parent. Use the site configuration for those decisions.

`site.url("/games")` produces `https://grida.co/index/games`; `site.homeUrl` points to the parent home page. `site.publications` lists indexable pages by child path, and `site.isPublished("/games")` connects page indexability to that registry. The registry starts empty.

## License

Source code is licensed under [Apache-2.0](LICENSE). Referenced media and game artifacts retain their own rights and publication records.
