# Hosting Setup (Zeaun.com / GoDaddy — open beta)

Working FTP (verified 2026-07-27):

- Host: `zeaun.com` (plain FTP and explicit FTPS, port 21)
- Username: `zeaun_arkhimsc@zeaun.com`
- Credentials file: `/home/zupreme/Zdrop/godaddy-ftp.txt` (password unchanged until true production)
- Login home **is** the Zeaun web root (`music/`, `quran/`, `static/`, …). Do **not** `cwd public_html/zeaun.com/`.
- Dead host (do not use): `ftp.magnitudemedia.group` (NXDOMAIN — this is why OpenClaw stalled)

Sync music mockup:

```bash
python3 /home/zupreme/Zdrop/_sync_music_ftp.py
```

Canonical dossier remains on GitHub Pages: `https://zupreme.github.io/music-to-win-by/`

## Suggested layout

- `zeaun.com` -> branded site
- `zeaun.com/music/` -> album front door (mockup sync target)
- `zupreme.github.io/music-to-win-by/` -> canonical dossier

## Publishing rules

- Use `music-to-win-by` as the public slug.
- Keep dossier and branded site pointing at the same published release language.
- Leave outbound slots blank until verified live (no `href="#"` fakes).
