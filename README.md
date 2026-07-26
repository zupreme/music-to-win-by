# Music to Win By

Artist: `#zupreme`

This workspace folder is the local release package for the album.
It is designed to stay editable while the published release is mirrored and
to remain the source of truth for public hosting.

Source audio is expected from `/home/zupreme/Zdrop/Zupreme - Music to Win By - MASTERED/`.

## Current goals

- Keep a clean canonical dossier for the album.
- Keep `index.html` and `album.json` in lockstep as the canonical public package.
- Keep the release legible to cyber / IT audiences.
- Mirror the public release cleanly across stable hosts.
- Keep links to major music networks current and accurate.
- Keep the archive handoff staged in `archive-package.md`; the playlist,
  cover art, and audio masters are already represented there.
- Use `source_manifest.json` and the staging script to ingest the Zdrop folder.
- Keep the browseable local preview in `mockup/` aligned with the public stack.

## Recommended public stack

1. GitHub Pages
   - Canonical dossier
   - Track notes
   - Release facts
   - Public metadata
   - Live: `https://zupreme.github.io/music-to-win-by/`

2. Cloudflare Pages
   - Branded landing page
   - Static player shell
   - Fast global delivery
   - Live: `https://zeaun.com/music/`

3. Internet Archive
   - Long-term archive
   - Audio mirror
   - Preservation copy
   - Live: `https://archive.org/details/music-to-win-by`

## Release plan

### Phase 1: Canonical package

- Freeze the track order and titles.
- Write one-line summaries for each track.
- Produce a short album statement.
- Add structured metadata for search and agents.
- Keep the mirrorable source files aligned:
  - `index.html`
  - `album.json`
  - `README.md`
  - `PLAN.md`

### Phase 2: Public dossier

- Maintain the GitHub Pages dossier with:
  - album summary
  - track list
  - credits
  - rights note
  - contact / links section

### Phase 3: Landing page

- Keep the Zeaun.com front door crisp, minimal, and easy to cite.
- Include a track table, album story, and outbound links.

### Phase 4: Archive mirror

- Upload the staged playlist, audio masters, and cover art to Internet Archive.
- Mirror the metadata and preserve the release notes.
- Use `archive-package.md` as the staging manifest for the upload bundle.

### Phase 5: Network links

- Keep links to major music networks accurate and current.
- Keep the same public copy and metadata consistent everywhere.

## Track list

1. System Startup Sequence
2. MD File
3. The Agentic Layer
4. Penetration Testing Mantra
5. The Encoder Tantric
6. Flow State Activated
7. Goal in Focus
8. The Zen of Lyubov
9. Good Ole Boy Behind The Paywall
10. Like a Redteam Cartel
11. Data Exfiltration

## Notes

- Keep the language direct and technical.
- Lean into the album's cybersecurity / operator / focus-work identity.
- Use the cover art as a visual anchor for the whole release.
- Add platform links only when they are live and worth the signal.
- Prefer the plain track 10 filename over the `(1)` duplicate when ingesting.
