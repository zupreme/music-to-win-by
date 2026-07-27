# Music to Win By - Hosting Map

This is the clean public layout for the published release.

## Canonical source

- GitHub account: `zupreme`
- Pages repo slug: `music-to-win-by`
- Canonical dossier: `https://zupreme.github.io/music-to-win-by/`
- Role: builder-facing dossier, playlist host, developer kit host, and
  machine-readable release reference

## Public front door

- Host: `zeaun.com`
- Path: `/music/`
- Role: polished release landing page, primary shareable entry point, and integration cue

## Preservation mirror

- Host: `archive.org`
- Item: `music-to-win-by`
- Role: long-term preservation copy for the album package and masters

## Main branded site

- Domain: `zeaun.com`
- Host provider: GoDaddy cPanel
- Role: artist/project home, contact surface, and any branded redirects

## Recommended URL pattern

- Use hyphenated slugs for public URLs: `music-to-win-by`
- Avoid underscores in public paths unless a legacy asset already depends on them
- Keep the same title, artist name, and release status everywhere
- Keep `audio/Zupreme-Music_to_Win_By.m3u` beside `audio/` so the bundle stays
  portable
- Keep the playable bundle in `audio/` with the 11 WAV masters plus the playlist
- Keep the developer kit branches in `developer-kits/`
- Current live music path: `https://zeaun.com/music/`
