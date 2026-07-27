# GitHub Pages Scaffold

This folder records the intended GitHub Pages structure for the published
`music-to-win-by` repo under `zupreme`.

## Intended publish root

- `index.html`
- `album.json`
- `README.md`
- `PLAN.md`
- `archive-package.md`
- `promo/`
- `Zupreme-Music_to_Win_By.m3u`
- `audio/`
- `developer-kits/`
- `.nojekyll`

## Repo behavior

- Keep the public dossier at the repo root.
- Keep the published wording aligned with the local canonical files.
- Use hyphenated public URLs, not underscore slugs.
- Keep the root playlist pointing at the staged `audio/` folder so the bundle
  stays portable from a copied Pages repo.
- Keep the builder code examples in `developer-kits/` so they stay alongside
  the public release.

## Deployment note

When you are ready to push the Pages repo, copy the canonical release files
from this workspace root into the GitHub repo root and sync the staged
`audio/` bundle, `Zupreme-Music_to_Win_By.m3u`, and `developer-kits/`.
