# Contributing

This repository owns authored Grida pages: launches, presentations, demos, showcases, and other marketing experiences with their own composition and release cycle. Pages can evolve across products and industries. Read the [publish-page skill](.agents/skills/publish-page/SKILL.md) when changing a page’s content, location, or publication status.

## Ownership and routing

| Surface                                      | Owner                                                         | Delivery                                                                                               |
| -------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `grida.co` and existing public routes        | [gridaco/grida](https://github.com/gridaco/grida)             | The parent Next.js app receives requests and owns the ingress configuration.                           |
| New `/index` pages                           | This repository, `gridaco/www`                                | The `grida-www-index` Vercel project, reached through parent rewrites that preserve `/index`.          |
| Existing `/index/canvas` and its descendants | [gridaco/grida](https://github.com/gridaco/grida)             | Explicitly retained by the parent; the new subtree does not transfer this existing route.              |
| `/fx`                                        | [gridaco/fx](https://github.com/gridaco/fx/tree/main/www)     | FX keeps its own website and deployment.                                                               |
| Game source and generated showcase artifacts | Their authoring repositories and separately published storage | A page consumes a selected release; publishing or building the page does not generate new game assets. |

The public URL, source repository, deployment, and artifact storage have separate owners. Adding a page here does not move its originating project into this repository. Forwarded requests still pass through the parent’s proxy and maintenance behavior. Do not import the authenticated editor’s `host/url.ts` or use universal auth aliases for marketing links.

## Current setup

- `/index` temporarily redirects to `https://grida.co/home` with HTTP 307, including during local development.
- `/index/games` is an almost blank placeholder: `noindex`, unadvertised, and absent from the sitemap.
- `/index/sitemap.xml` contains no entries. The parent’s `/robots.txt` owns crawl policy; there is no child robots route.
- The [parent integration draft PR](https://github.com/gridaco/grida/pull/1141) activates the public subtree when merged. Until then, verify through the [standalone deployment](https://grida-www-index.vercel.app/index/games).
- This scaffold provisions no game runtime, CDN bucket, or artifact publishing pipeline. Actual page design and production content are separate work.

The parent redirects exact `/index` in early routing for its canonical, exact Vercel preview/branch, and local app hosts, before Next.js normalizes that path to `/`. Tenant/custom-domain hosts retain their own `/index` pages. The child keeps a matching temporary 307 for standalone access.

Publishing a collection at `/index` requires removing the child redirect and replacing the parent redirect with an early, host-scoped exact-base-path rewrite in a separate parent PR. Preserve descendant rewrites and the `/index/canvas` exception.

## Local work

Use Node.js 26 (Lithium LTS) and the pinned pnpm 11.5.2 release. From the repository root, `nvm install` and `nvm use` read `.nvmrc`. If pnpm 11.5.2 is absent after switching Node.js, install it separately with `npm install --global pnpm@11.5.2`; an existing matching installation can be reused. Run the workspace commands from the repository root:

```sh
pnpm install
pnpm hooks:install
pnpm dev
pnpm fmt
pnpm check
pnpm build
```

`pnpm check` combines formatting verification, lint, and typechecking. The individual commands are:

```sh
pnpm fmt:check
pnpm lint
pnpm typecheck
```

Open [http://127.0.0.1:3100/index/games](http://127.0.0.1:3100/index/games) to inspect the setup page. This scaffold needs no environment file. Check both a direct child deployment and the parent rewrite when a change affects public routing; a successful build alone does not verify ingress.

After a build, `pnpm --filter @grida/www-index start` serves the local production app.

## Pages and code

The Next.js application lives in the top-level `www/` directory; workspace and Turborepo commands run from the repository root. Set the Vercel project’s Root Directory to `www`. Keep a page’s authored composition close to its route and extract shared components when actual pages need them. Add game dependencies only for a decided demonstration, rather than making the initial website depend on a game engine or generator.

## Brand assets

Use the existing Grida artwork rather than redrawing it:

- [`www/public/brand/`](www/public/brand/) contains the symbol and wordmark in SVG and PNG. Files ending in `-dark` are white artwork for dark backgrounds; the other files contain black artwork.
- [`GridaLogo`](www/components/grida-logo.tsx) is the inline React symbol. It uses `currentColor`, accepts native SVG props and a `size` (default 24), and has the accessible name “Grida”. Set `aria-hidden` when adjacent text or the containing link already names the brand.
- [`www/app/icon.png`](www/app/icon.png) supplies the browser favicon through Next.js’s metadata file convention, including the `/index` prefix. The source favicon is PNG data despite its `.ico` filename; keep the correct PNG extension here.
- [`.readme/cover.png`](.readme/cover.png) is the repository cover.

These are local copies from [Grida’s public brand assets](https://github.com/gridaco/grida/tree/main/editor/public/brand), [logo component](https://github.com/gridaco/grida/blob/main/packages/grida-react-icons/src/logos/grida.tsx), [favicon](https://github.com/gridaco/grida/blob/main/editor/app/favicon.ico), and [README cover](https://github.com/gridaco/grida/blob/main/.readme/cover.png). Keep them aligned with the source when the brand changes. They require no private package dependency or remote asset host.

Static brand URLs include the base path: for example, `/index/brand/grida-wordmark-400.svg`. Use `site.url("/brand/grida-wordmark-400.svg")` when an absolute public URL is needed. Choose the contrasting artwork and provide alt text when using an image.

## URL configuration

[`www/site.config.ts`](www/site.config.ts) exports the `site` object and owns site identity, page registration, metadata URLs, and parent links. Keep these values distinct:

| Value                                | Purpose                                                    |
| ------------------------------------ | ---------------------------------------------------------- |
| `https://grida.co`                   | Canonical public origin used in metadata and public links. |
| `/index`                             | Native Next.js `basePath`, with `trailingSlash: false`.    |
| `https://grida-www-index.vercel.app` | Upstream origin for the parent rewrite, without `/index`.  |
| The local server origin              | Development and verification, not published metadata.      |

The parent’s `WWW_INDEX_URL` reads `NEXT_PUBLIC_WWW_INDEX_URL` to select the upstream origin. Rewrites preserve `/index` exactly once. Next.js handles the base path for its routes, assets, and supported link helpers; metadata and literal URLs still need deliberate configuration.

Update the site registry when adding, moving, removing, or changing the indexability of a page. A route file, its canonical URL, and its sitemap entry must describe the same public page.

Register an indexable page as `{ path: "/games" }` in `site.publications`, use `site.url("/games")` for its canonical URL, and derive its `robots.index` value from `site.isPublished("/games")`. The sitemap reads the same registry. Use `site.homeUrl` for the parent home link. The root metadata defaults to `noindex`; a real page must set its own metadata deliberately.

## Links and metadata

- Use child route helpers and Next.js links for navigation within this application. Do not add `/index` twice.
- Use canonical public URLs for links to the parent, FX, docs, or another separately deployed surface. A literal `/home` can resolve against a direct child deployment, so it is not a reliable parent link there.
- Keep canonical and Open Graph URLs on `https://grida.co/index/...`, regardless of the local, preview, or production deployment host used to render the page.
- A native `basePath` does not automatically repair metadata URLs, literal asset paths, or links to another application.
- Use relative repository links within these contributor documents. Use public GitHub `main` URLs when referring to another repository; local checkout paths are not contributor references.
- Add suitable page titles, descriptions, canonical URLs, social metadata, and accessible media descriptions when real content is introduced. Keep unfinished pages `noindex` and out of the sitemap and navigation.

The setup games page stays unadvertised and excluded from the child sitemap. Once indexable pages exist, the parent’s root robots file must discover the child sitemap. This application has no separate robots route; a nested `/index/robots.txt` would not configure crawling for the whole host.

## Deployment and cross-repository release

Pushes to `main` deploy automatically through Vercel’s Git integration. The `grida-www-index` project uses Root Directory `www` and Node.js 26 (Lithium LTS), serving `https://grida-www-index.vercel.app`. Public canonicals remain on `grida.co`.

Website content and Vercel deployment configuration belong here. Public ingress and main-site discovery belong in [gridaco/grida](https://github.com/gridaco/grida). Keep parent changes in a separate PR, linked from the website PR or handoff where relevant. Use the [publish-page skill](.agents/skills/publish-page/SKILL.md) to identify the owning parent files; it distinguishes navigation data from XML sitemap generation.

After activation, ordinary page edits deploy from this repository independently. Changes to parent navigation, redirects, ownership, or sitemap discovery still require their own parent PR. Roll back public integration by reverting the parent routing change before retiring this deployment.

Authored website code deploys without rebuilding or regenerating the artifacts it presents. Keep generated runs, heavyweight game builds, and working recordings in their originating workflow or artifact storage. Reference selected published outputs; a future CDN publishing process should preserve that manual curation boundary.

The initial scaffold has minimal styling. It does not copy the main site’s header/footer or establish a shared runtime design package. Design each experience for its reader while keeping first-party navigation recognizable and accurate.

Before handing off a page, report its public route, indexability, deployment result, artifact dependencies, and any remaining parent PR. For a move or removal, account for incoming links and redirects as well as the child route. Do not describe a child deployment as publicly activated while the required parent change is unmerged.

## Repository history and licensing

`gridaco/grida.co` was renamed to `gridaco/www`. Its historical main branch is preserved as `snapshot/pre-www-2026-11-13`; the current `main` begins with a fresh root commit.

Source code is licensed under [Apache-2.0](LICENSE). Referenced media and game artifacts retain their own rights and publication records.
