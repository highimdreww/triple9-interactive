# Triple9 Interactive v1

Homepage-only handoff for Alfred. No repository was created, modified, pushed, or published during this delivery.

## Run

Use Node 22. Run `npm ci`, then `npm run build`. Run `npm run dev` for the homepage at `/triple9-interactive/`. `npm run preview` serves the production output locally.

Astro is pinned to 5.16.0, matching the Design project's major and declared minimum version. Tailwind is 3.4.17 with @astrojs/tailwind 6.0.2. The committed lockfile makes installs reproducible. Fonts are bundled locally through Fontsource. No remote font requests, image requests, tracking scripts, or cookies are introduced.

## Content

- `src/content/titles.json`: featured title, spotlight order, roster, public copy, artwork configuration and exact art specifications.
- `src/content/site.json`: studio metadata and external integrations.
- To change the hero, set `featuredTitleId` to an existing title ID. Every title supports all four art slots. Adjust `spotlightIds` to avoid showing the same title in both places if desired.
- To add a title, copy one complete record, assign a unique ID, and update its content. Use `neutral` for a new typographic treatment without CSS changes. It automatically appears in the library; add its ID to `spotlightIds` to feature it.
- `workingTitle` and `internalDescription` are build-time-only editorial fields. The page renders `publicTitle`, never these fields. Golf game is a descriptive public label, not a final game name. No final name was supplied or invented.
- `pagePath` stays null until the corresponding page exists. Current covers are deliberately not fake links. Once a page is built, set its public-relative path, such as `titles/selah/`, and the library cover becomes a link.
- View all is an in-page path to the complete roster. It resets Games or Apps filtering. Without JavaScript all four titles remain visible.

## Integrations to supply

No verified newsletter provider, privacy policy, contact address, support destination, or social account was included in the brief. Pending states are visible and collect no personal information. No addresses or account links have been guessed.

Set `newsletter.action` to the provider's HTTPS form POST endpoint, `emailField` to its expected field name, and `privacyUrl` to the approved privacy policy. This enables the native form and browser email validation. The provider must accept a simple email-only POST and handle its confirmation response. Providers requiring hidden fields, tokens or a proxy need a provider-specific integration. Do not treat the current pending state as a connected mailing list.

Set `contactEmail`, `supportUrl`, `legalUrl`, and `socials` with verified destinations. Social records have `label` and `url` fields. Until then, footer disclosure controls explain their pending state; Legal identifies the LLC without pretending to be a complete terms or privacy policy.

## GitHub Pages

Target repository: highimdreww/triple9-interactive.

`site` is `https://highimdreww.github.io`; `base` is `/triple9-interactive`; trailing slashes are enabled. All local asset paths use BASE_URL. No custom domain or CNAME is included.

The workflow builds on main pushes and pull requests. Publishing is intentionally manual: Alfred enables GitHub Actions as the Pages source, chooses Run workflow on main, and checks publish when the site is approved. Ordinary pushes do not deploy. Nothing has been run on GitHub by this delivery.

## Validation

`npm run build` validates content, runs Astro type checks, builds the static homepage, then checks the generated HTML for broken anchors, missing base prefixes, missing local assets, the canonical URL, one h1, and banned content. The source scan excludes the scanner scripts themselves because they contain the prohibited patterns as test fixtures.

Verified: build succeeded, 1 page, 0 Astro errors, 0 Astro warnings, 0 hints. Astro/Vite emitted an upstream unused-import warning from its own remote-pattern helper. Production route: `/triple9-interactive/`, emitted as `dist/index.html`.

Browser visual and interactive QA is unverified: the managed preview service timed out while Astro reported ready at the project-base route. No screenshot approval is claimed. Alfred should inspect 390px, 768px, 1440px and 1920px widths, keyboard focus, filter controls, footer disclosures and reduced-motion behavior before release.

## References read

Rockstar live homepage: https://www.rockstargames.com/

Observed a large art-and-logo hero with limited actions, expansive title spotlights with platform marks, a separate library and View All route, newsletter and utility-heavy footer. Retained that hierarchy. Omitted its news, store, animated library marquee and multiple hero slides to fit this scope and its restrictions.

Read fresh through GitHub on the Design default branch: package.json, astro.config.mjs, tailwind.config.mjs, .github/workflows/deploy.yml, src/pages/index.astro, src/layouts/BaseLayout.astro and src/content/home.json. The initial src/data/home.json lookup returned 404; the page import identified the correct content directory. Reused its project organization and base handling, not its services content or visual identity.

Read current Astro docs through Context7, library `/withastro/docs`: GitHub Pages configuration, base/BASE_URL behavior, trailingSlash and the supported legacy Tailwind 3 integration. References: https://docs.astro.build/en/guides/deploy/github/ and https://docs.astro.build/en/guides/styling/ . Kept the requested Design stack instead of migrating this handoff to a newer Astro major.

## Next-page proposal

One reusable title page: full-bleed responsive approved art with live title; a single status or verified store action; a compact platform/status row; one short premise; approved screenshot or gameplay sequence; a small feature section only when it has real material; relevant support; the shared footer. Development titles show In development without a fake wishlist, date or trailer. Apps use actual app screens in the same media section. No title pages are built in v1.

## Wordmark proposal

Live T9. in a tightly set heavy condensed sans in the header, paired with a small two-line Triple9 Interactive descriptor. Footer uses a larger Triple9 with Interactive underneath. Warm white on black, square geometry, no badge, frame or logo image. The current homepage demonstrates this treatment. Exact title-name casing is preserved; navigation, section headings and actions use sentence case.
