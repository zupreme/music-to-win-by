# Zeaun.com GoDaddy cPanel Setup

This is the minimum setup checklist for hosting the branded site on GoDaddy.

## What I need from you

- cPanel login access
- DNS edit access for `zeaun.com`
- The exact root/subdomain plan
- Whether Cloudflare will sit in front of the GoDaddy host
- Any contact email or form destination you want published
- Current blocker note: the GoDaddy FTP service is reachable from the workspace, but production sync still needs valid credentials and the exact remote upload path, or cPanel file-manager access.

## Suggested layout

- `zeaun.com` -> main branded site and contact surface
- `zeaun.com/music/` -> album front door under the brand
- `zupreme.github.io/music-to-win-by/` -> canonical dossier source

## cPanel steps

1. Open cPanel.
2. Add the domain or subdomain you want to use.
3. Point the document root to the static release folder.
4. Upload the public files:
   - `index.html`
   - `album.json`
   - `README.md`
   - `PLAN.md`
   - `promo/`
   - `mockup/` if you want the preview surfaces public
5. Turn on SSL for the host.
6. Add redirects only after the final URLs are confirmed.

## DNS steps

1. Decide whether GoDaddy or Cloudflare will be authoritative for DNS.
2. If Cloudflare is authoritative, update the nameservers at GoDaddy.
3. If GoDaddy stays authoritative, add the needed A/CNAME records there.
4. Keep the records minimal:
  - root domain
  - `www`
  - `music` path or rewrite target
  - any press or contact subdomain

## Publishing rules

- Use `music-to-win-by` as the public slug.
- Do not mix underscores and hyphens in the public URLs.
- Keep the GitHub Pages URL, the Cloudflare URL, and the GoDaddy host all pointing at the same published release language.
