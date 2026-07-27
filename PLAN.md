# Music to Win By - Release Plan

## Objective

Build a clean, public-facing release package for the album so it can be
published, mirrored, cited, and reused without depending on the local laptop
staying online.

Source staging lives in `/home/zupreme/Zdrop/Zupreme - Music to Win By - MASTERED/`.

## Distribution strategy

### Canonical

- GitHub Pages
- Static dossier with album facts, track notes, and contact/link section
- Developer-facing integration cues for technical teams
- Root playlist plus `audio/` bundle with the 11 WAV masters
- Live: `https://zupreme.github.io/music-to-win-by/`

### Public landing page

- Zeaun.com
- Visual front door for the album
- Keep copy short, quotable, and easy to reuse in products or demos
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
5. Write the integration-first framing for technical audiences.
6. Prepare the archive upload package.
7. Publish GitHub Pages.
8. Publish Zeaun.com front door.
9. Mirror to Internet Archive.

## Current status

- Track order and titles are frozen.
- Track summaries are written and mirrored in `album.json`.
- The homepage copy is published and mirrored in `index.html`, `album.json`, `README.md`, and `PLAN.md`.
- The homepage copy now speaks to builders, integrators, and technical audiences instead of generic release promotion.
- The canonical package now centers `index.html`, `album.json`, `README.md`, and `PLAN.md`.
- The GitHub Pages repo now also carries the root `Zupreme-Music_to_Win_By.m3u`
  playlist plus the `audio/` bundle with the 11 WAV masters.
- Developer kits now live under `developer-kits/` with ready-made examples for
  JavaScript, Python, Go, PowerShell, and CSS.
- Live outbound links are populated for the approved hosts and services.
- Archive packaging is staged with the playlist, audio masters, and cover art;
  archive upload remains the next active step.
- `archive-package.md` now stages the current upload bundle with checksums.
- `source_manifest.json` and the staging script map the live Zdrop drop into the package.
- `mockup/` provides a browseable local preview of the public stack while the release stays editable.
- The GoDaddy production mirror is still blocked until valid FTP/SFTP credentials and the exact remote upload path are known, or cPanel file access is available; the FTP service itself is reachable from this workspace.

## Editorial rules

- Keep the tone authoritative and useful.
- Use cyber / operator language without sounding gimmicky.
- Avoid spam tactics and avoid teaching release promotion as a goal in itself.
- Write for builders who may want to integrate the album into software, dashboards, demos, or internal tools.
- Make the page easy for humans, search engines, and AI assistants to cite.
- Leave only unverified outbound network fields as placeholders.
- Prefer the canonical track 10 filename over the suffixed duplicate when ingesting.
