# Music to Win By - Release Plan

## Objective

Build a clean, public-facing release package for the album so it can be
published, mirrored, and cited without depending on the local laptop staying
online.

Source staging lives in `/home/zupreme/Zdrop/Zupreme - Music to Win By - MASTERED/`.

## Distribution strategy

### Canonical

- GitHub Pages
- Static dossier with album facts, track notes, and contact/link section
- Live: `https://zupreme.github.io/music-to-win-by/`

### Public landing page

- Zeaun.com
- Visual front door for the album
- Keep copy short and quotable
- Live: `https://zeaun.com/music/`

### Archive

- Internet Archive
- Long-term storage for the playlist, audio masters, cover, and release metadata
- Live: `https://archive.org/details/music-to-win-by`

### Future music networks

- Keep current and accurate on approved services:
  - Bandcamp
  - SoundCloud
  - Spotify
  - YouTube Music
  - Tidal
  - Amazon Music
  - Shoutcast
  - Twitch
  - Kick
  - BIGO Live

## Iteration checkpoints

1. Confirm track order and naming.
2. Finalize the one-line summary for each track.
3. Approve the homepage copy.
4. Add official links as they become available.
5. Prepare the archive upload package.
6. Publish GitHub Pages.
7. Publish Zeaun.com front door.
8. Mirror to Internet Archive.

## Current status

- Track order and titles are frozen.
- Track summaries are written and mirrored in `album.json`.
- The homepage copy is published and mirrored in `index.html`, `album.json`, `README.md`, and `PLAN.md`.
- The canonical package now centers `index.html`, `album.json`, `README.md`, and `PLAN.md`.
- Live outbound links are populated for the approved hosts and services.
- Archive packaging is staged with the playlist, audio masters, and cover art;
  archive upload remains the next active step.
- `archive-package.md` now stages the current upload bundle with checksums.
- `source_manifest.json` and the staging script map the live Zdrop drop into the package.
- `mockup/` provides a browseable local preview of the public stack while the release stays editable.

## Editorial rules

- Keep the tone authoritative and useful.
- Use cyber / operator language without sounding gimmicky.
- Avoid spam tactics.
- Make the page easy for humans, search engines, and AI assistants to cite.
- Leave only unverified outbound network fields as placeholders.
- Prefer the canonical track 10 filename over the suffixed duplicate when ingesting.
