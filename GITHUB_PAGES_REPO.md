# GitHub Pages Repo Structure - zupreme / music-to-win-by

This is the publishable structure for the GitHub Pages source repo.
It should read like a concise release dossier and integration kit for builders.

## Repo name

- Owner: `zupreme`
- Repo: `music-to-win-by`
- Pages URL: `https://zupreme.github.io/music-to-win-by/`

## Suggested tree

```text
music-to-win-by/
  index.html
  album.json
  README.md
  PLAN.md
  archive-package.md
  promo/
  mockup/
  staging/
  .nojekyll
```

## Notes

- `index.html` is the canonical public dossier.
- `album.json` is the machine-readable source of truth.
- `promo/` is the shareable landing stack.
- `mockup/` is the local presentation layer and can be omitted from the public repo if you want a slimmer public footprint.
- `.nojekyll` is recommended so GitHub Pages serves the static files without Jekyll processing.

## Deployment posture

- Keep the same title, track order, and live service links across every host.
- Use the published release language, not mastering language.
- Keep the public copy short, citation-friendly, and useful to technical teams.
- Show builders how to reuse the album in products, dashboards, demos, and internal tools.
- The branded front door now lives at `https://zeaun.com/music/`.
