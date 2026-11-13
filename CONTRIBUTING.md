# Contributing

This repository holds public Grida experiences on the WWW Index surface. The repository remains `gridaco/www` and the application stays in `www/`; the deployed Vercel project is `grida-www-index`. Start with [README.md](README.md) for route ownership and the initial setup’s limitations, and read the [publish-page skill](.agents/skills/publish-page/SKILL.md) when changing a page’s content, location, or publication status.

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

The development app serves its native `/index` base path at `http://127.0.0.1:3100`. Use `/index/games` to inspect the setup page. Check both a direct child deployment and the parent rewrite when a change affects public routing; a successful build alone does not verify ingress.

After a build, `pnpm --filter @grida/www-index start` serves the local production app.

## Pages and code

The Next.js application lives in the top-level `www/` directory; workspace and Turborepo commands run from the repository root. Set the Vercel project’s Root Directory to `www`. Keep a page’s authored composition close to its route and extract shared components when actual pages need them. Add game dependencies only for a decided demonstration, rather than making the initial website depend on a game engine or generator.

Use the `site` object in [`www/site.config.ts`](www/site.config.ts) for page registration, metadata, public paths, and parent links. Update its registry when adding, moving, removing, or changing the indexability of a page. A route file, its canonical URL, and its sitemap entry must describe the same public page.

Register an indexable page as `{ path: "/games" }` in `site.publications`, use `site.url("/games")` for its canonical URL, and derive its `robots.index` value from `site.isPublished("/games")`. The sitemap reads the same registry. Use `site.homeUrl` for the parent home link. The root metadata defaults to `noindex`; a real page must set its own metadata deliberately.

Authored website code can deploy automatically without rebuilding or regenerating the artifacts it presents. Keep generated runs, heavyweight game builds, and working recordings in their originating workflow or artifact storage. Reference selected published outputs; a future CDN publishing process should preserve that manual curation boundary.

The initial scaffold deliberately has minimal styling. It does not copy the main site’s header/footer or establish a shared runtime design package. Design each experience for its reader while keeping first-party navigation recognizable and accurate.

## Links and metadata

- Use child route helpers and Next.js links for navigation within this application. Do not add `/index` twice.
- Use canonical public URLs for links to the parent, FX, docs, or another separately deployed surface. A literal `/home` can resolve against a direct child deployment, so it is not a reliable parent link there.
- Keep canonical and Open Graph URLs on `https://grida.co/index/...`, regardless of the local, preview, or production deployment host used to render the page.
- A native `basePath` does not automatically repair metadata URLs, literal asset paths, or links to another application.
- Use relative repository links within these contributor documents. Use public GitHub `main` URLs when referring to another repository; local checkout paths are not contributor references.
- Add suitable page titles, descriptions, canonical URLs, social metadata, and accessible media descriptions when real content is introduced. Keep unfinished pages `noindex` and out of the sitemap and navigation.

The setup games page stays unadvertised and excluded from the child sitemap. Once indexable pages exist, the parent’s root robots file must discover the child sitemap. This application has no separate robots route; a nested `/index/robots.txt` would not configure crawling for the whole host.

## Cross-repository release

Website content and Vercel deployment configuration belong here. Public ingress and main-site discovery belong in [gridaco/grida](https://github.com/gridaco/grida). Keep parent changes in a separate PR, linked from the website PR or handoff where relevant. Use the [publish-page skill](.agents/skills/publish-page/SKILL.md) to identify the owning parent files; it distinguishes navigation data from XML sitemap generation.

The initial parent draft PR is the activation step for this subtree. Keep the existing `/index/canvas` family parent-owned. After activation, ordinary page edits deploy from this repository automatically; changes to parent navigation, redirects, ownership, or sitemap discovery still require their own parent PR.

Before handing off a page, report its public route, indexability, deployment result, artifact dependencies, and any remaining parent PR. For a move or removal, account for incoming links and redirects as well as the child route. Do not describe a child deployment as publicly activated while the required parent change is unmerged.
