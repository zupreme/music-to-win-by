const COVER = "../staging/art/ZUPREME-Music_to_Win_By-COVER.png";
const PLIST = "../staging/Zupreme-Music_to_Win_By.m3u";

const PAGE_ORDER = [
  ["home", "Overview"],
  ["dossier", "GitHub Pages"],
  ["front-door", "Cloudflare Pages"],
  ["archive", "Internet Archive"],
  ["networks", "Network Links"],
  ["metadata", "Metadata"],
];

const PAGE_TITLES = {
  home: "Music to Win By - Public Mockup",
  dossier: "Music to Win By - GitHub Pages Mockup",
  "front-door": "Music to Win By - Cloudflare Pages Mockup",
  archive: "Music to Win By - Internet Archive Mockup",
  networks: "Music to Win By - Link Matrix Mockup",
  metadata: "Music to Win By - Metadata Mockup",
};

const PAGE_BLURBS = {
  home:
    "A browseable public stack: overview, dossier, landing page, archive mirror, metadata, and future distribution slots.",
  dossier:
    "This is the repo-style canonical dossier view intended for GitHub Pages.",
  "front-door":
    "This is the polished public landing page intended for Cloudflare Pages.",
  archive:
    "This is the preservation-first mirror view intended for the Internet Archive.",
  networks:
    "This is the link matrix for major music networks and selective discovery surfaces.",
  metadata:
    "This is the structured-data and citation surface for search engines and agents.",
};

const sectionTitle = (title, blurb, right = "") => `
  <div class="section-header">
    <div>
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(blurb)}</p>
    </div>
    ${right ? `<div class="help-text">${escapeHtml(right)}</div>` : ""}
  </div>
`;

const badge = (label, value) =>
  `<span class="badge"><strong>${escapeHtml(label)}</strong> ${escapeHtml(value)}</span>`;

const statusClass = (value) => (value === "live" ? "is-live" : "is-placeholder");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function pageNav(page) {
  return PAGE_ORDER.map(([key, label]) => {
    const current = key === page ? ' aria-current="page"' : "";
    const href = key === "home" ? "index.html" : `${key}.html`;
    return `<a href="${href}"${current}>${escapeHtml(label)}</a>`;
  }).join("");
}

function trackList(album) {
  return album.tracklist
    .map(
      (track) => `
        <li class="track" id="track-${track.track}">
          <div class="track-no">${String(track.track).padStart(2, "0")}</div>
          <div>
            <h3 class="track-title">${escapeHtml(track.title)}</h3>
            <p class="track-summary">${escapeHtml(track.summary)}</p>
          </div>
        </li>
      `
    )
    .join("");
}

function releaseFacts(album) {
  const stack = album.canonical_stack || {};
  const credits = album.credits || {};
  const single = album.single || {};
  return `
    <div class="metric-grid">
      <div class="metric"><strong>Artist</strong><span>${escapeHtml(album.artist)}</span></div>
      <div class="metric"><strong>Status</strong><span>${escapeHtml(album.release_status)}</span></div>
      <div class="metric"><strong>Primary stack</strong><span>${escapeHtml(stack.dossier || "")}</span></div>
      <div class="metric"><strong>Front door</strong><span>${escapeHtml(stack.front_door || "")}</span></div>
      <div class="metric"><strong>Archive</strong><span>${escapeHtml(stack.archive || "")}</span></div>
      <div class="metric"><strong>Single</strong><span>${escapeHtml(single.title || "not set")}</span></div>
      <div class="metric"><strong>Prepared for</strong><span>${escapeHtml((credits.prepared_for || []).join(", "))}</span></div>
    </div>
  `;
}

function renderServiceLinks(links) {
  const ordered = [
    ["spotify", "Spotify"],
    ["youtube_music", "YouTube Music"],
    ["tidal", "Tidal"],
    ["apple_music", "Apple Music"],
    ["amazon_music", "Amazon Music"],
  ];
  return ordered
    .filter(([key]) => links && links[key])
    .map(
      ([key, label]) =>
        `<a href="${escapeHtml(links[key])}" rel="noopener noreferrer">${escapeHtml(label)}</a>`
    )
    .join(" • ");
}

function pageShell(page, album, content) {
  document.title = PAGE_TITLES[page] || PAGE_TITLES.home;
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="page">
      <header class="topbar">
        <a class="brand" href="index.html">
          <span class="brand-mark"></span>
          <span>Music to Win By / Mockup</span>
        </a>
        <nav class="nav" aria-label="Primary">${pageNav(page)}</nav>
      </header>
      ${content}
      <footer class="footer">
        <div>${escapeHtml(album.artist)} / ${escapeHtml(album.album)} / local mockup</div>
        <div>${escapeHtml(PAGE_BLURBS[page] || PAGE_BLURBS.home)}</div>
      </footer>
    </div>
  `;
}

function homePage(album) {
  const releaseNotes = (album.release_notes || [])
    .map((note) => `<li>${escapeHtml(note)}</li>`)
    .join("");
  const linkCards = [
    ["GitHub Pages dossier", "Canonical docs, repo-style layout, and release notes.", "dossier.html"],
    ["Cloudflare Pages front door", "Polished landing page with the cover and the quick pitch.", "front-door.html"],
    ["Internet Archive mirror", "Preservation-first item page and upload bundle view.", "archive.html"],
    ["Network link matrix", "Future album URLs and discovery slots in one place.", "networks.html"],
    ["Metadata surface", "Structured data, citations, sitemap, and feed strategy.", "metadata.html"],
  ];
  const pages = linkCards
    .map(
      ([title, blurb, href]) => `
        <article class="page-card">
          <a href="${href}">
            <span class="subline">Open page</span>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(blurb)}</p>
          </a>
        </article>
      `
    )
    .join("");
  const content = `
    <section class="hero hero-split">
      <div class="hero-copy">
        <p class="eyebrow">Public-facing project mockup</p>
        <h1 class="title">${escapeHtml(album.album)}</h1>
        <p>
          A browseable local simulation of the full public release stack for
          ${escapeHtml(album.album)} by ${escapeHtml(album.artist)}. This mockup shows
          how the project can read on GitHub Pages, Cloudflare Pages, the Internet Archive,
          and the surrounding discovery surfaces once the album is approved for upload.
        </p>
        <div class="meta-row">
          ${badge("Tracks", String((album.tracklist || []).length))}
          ${badge("Status", album.release_status)}
          ${badge("Primary mirror", album.canonical_stack.archive || "")}
          ${badge("Artist", album.artist)}
        </div>
        <div class="call-to-action">
          <a class="button primary" href="dossier.html">Open the dossier</a>
          <a class="button" href="front-door.html">Open the front door</a>
          <a class="button" href="archive.html">Open the archive</a>
        </div>
        <div class="hero-callout">
          <div class="callout-title">What this is</div>
          <div>${escapeHtml(album.public_summary)}</div>
        </div>
      </div>
      <div class="hero-side">
        <div class="cover-card">
          <img src="${COVER}" alt="Cover art for Music to Win By" />
        </div>
        <div class="card">
          <h2>Release facts</h2>
          ${releaseFacts(album)}
        </div>
      </div>
    </section>

    <section class="section">
      ${sectionTitle("Release pages", "The album and single now have their own live public URLs on the major services.")}
      <div class="grid-2">
        <div class="card">
          <h3>${escapeHtml(album.album)}</h3>
          <p>${escapeHtml(album.public_summary)}</p>
          <div class="divider"></div>
          <div class="split-note">${renderServiceLinks(album.links || {})}</div>
        </div>
        <div class="card">
          <h3>${escapeHtml((album.single || {}).title || "Single")}</h3>
          <p>A separate release page for the companion single.</p>
          <div class="divider"></div>
          <div class="split-note">${renderServiceLinks((album.single || {}).links || {})}</div>
        </div>
      </div>
    </section>

    <section class="section">
      ${sectionTitle(
        "Public stack",
        "The release is intentionally split into distinct public faces so each host can do one job well.",
        "GitHub = dossier, Cloudflare = front door, Archive = preservation."
      )}
      <div class="grid-3">
        ${pages}
      </div>
    </section>

    <section class="section">
      ${sectionTitle(
        "Track architecture",
        "The track order is authoritative from the staged metadata and ID3 tags."
      )}
      <ol class="track-list">${trackList(album)}</ol>
    </section>

    <section class="section">
      ${sectionTitle(
        "Release notes",
        "These are the operating assumptions that stay visible everywhere the album appears."
      )}
      <div class="grid-2">
        <ul class="note-list">${releaseNotes}</ul>
        <div class="card">
          <h3>Public-facing rules</h3>
          <p>
            Keep the copy direct, cyber-literate, and quote-friendly. Link out only when the
            destination is verified and live. Use the same artist name, release title, and track
            order across every host.
          </p>
          <div class="divider"></div>
          <div class="meta-row">
            ${badge("Playlist", "staged")}
            ${badge("Cover art", "staged")}
            ${badge("Audio masters", "staged")}
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      ${sectionTitle(
        "Future links",
        "These are the eventual outbound slots. They stay blank only for hosts that are not yet verified and live."
      )}
      <div class="grid-4">
        ${(album.links ? Object.entries(album.links) : [])
          .map(
            ([key, value]) => `
              <div class="card">
                <h3>${escapeHtml(key.replaceAll("_", " "))}</h3>
                <p>${escapeHtml(value || "placeholder")}</p>
                <div class="divider"></div>
                <span class="status ${statusClass(value ? "live" : "placeholder")}">${value ? "live slot" : "placeholder"}</span>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;

  pageShell("home", album, content);
}

function dossierPage(album) {
  const files = [
    ["README.md", "Orientation / public story / release rules"],
    ["index.html", "Canonical public dossier"],
    ["album.json", "Structured metadata and release state"],
    ["PLAN.md", "Rollout and publication plan"],
    ["archive-package.md", "Archive handoff manifest"],
    ["staging/", "Playlist, cover art, and audio masters"],
  ];
  const content = `
    <section class="hero">
      <p class="eyebrow">GitHub Pages mockup</p>
      <h1 class="title" style="max-width: 14ch;">Repo-Style Dossier</h1>
      <div class="repo-frame">
        <div class="repo-pane">
          <div class="card">
            <div class="repo-header">
              <div class="repo-path"><code>zupreme</code> / <code>music_to_win_by</code></div>
              <div class="chip-row">
                <span class="chip">public</span>
                <span class="chip">static</span>
                <span class="chip">crawlable</span>
                <span class="chip">metadata-first</span>
              </div>
            </div>
            <div class="divider"></div>
            <p>
              This view is meant to feel like the top of a well-maintained public repository:
              the README is the entry point, the manifest is explicit, and the album facts are
              easy to skim without needing a login.
            </p>
          </div>
          <div class="card">
            <h2>Repository layout</h2>
            <div class="file-list">
              ${files
                .map(
                  ([file, desc]) => `
                    <div class="file-row">
                      <code>${escapeHtml(file)}</code>
                      <small>${escapeHtml(desc)}</small>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>
        <aside class="shell-pane">
          <div class="card">
            <h2>README excerpt</h2>
            <div class="code-block">Artist: ${escapeHtml(album.artist)}
Release: ${escapeHtml(album.album)}
Status: ${escapeHtml(album.release_status)}
Stack: ${escapeHtml(album.canonical_stack.dossier)}

This repository is the canonical dossier for the album.
It stays aligned with the public landing page and the archive mirror.</div>
          </div>
          <div class="card">
            <h2>Release facts</h2>
            ${releaseFacts(album)}
          </div>
        </aside>
      </div>
    </section>

    <section class="section">
      ${sectionTitle("Track notes", "Each track gets a short public-facing description suitable for a repo README or release page.")}
      <ol class="track-list">${trackList(album)}</ol>
    </section>

    <section class="section">
      ${sectionTitle("Publication posture", "The repo surface keeps the language direct enough for humans and structured enough for search.")}
      <div class="grid-3">
        <div class="card">
          <h3>Readable</h3>
          <p>Short paragraphs, explicit labels, and a track list that can be scanned in seconds.</p>
        </div>
        <div class="card">
          <h3>Mirrorable</h3>
          <p>The same markdown and HTML can be copied to GitHub Pages, Cloudflare Pages, or a static archive.</p>
        </div>
        <div class="card">
          <h3>Legible to agents</h3>
          <p>The page is written so retrieval systems can identify the album, the artist, the track order, and the intended audience.</p>
        </div>
      </div>
    </section>
  `;

  pageShell("dossier", album, content);
}

function frontDoorPage(album) {
  const content = `
    <section class="hero hero-split">
      <div class="hero-copy">
        <p class="eyebrow">Cloudflare Pages mockup</p>
        <h1 class="title">${escapeHtml(album.album)}</h1>
        <p>
          This is the polished public front door: a visually stronger landing page that
          stays minimal in structure, easy to load, and easy to point people toward from
          social profiles, search, or AI-assisted recommendations.
        </p>
        <div class="meta-row">
          ${badge("Delivery", "static")}
          ${badge("Audience", "cyber / IT / focus work")}
          ${badge("Role", "first impression")}
        </div>
        <div class="call-to-action">
          <a class="button primary" href="dossier.html">Open dossier</a>
          <a class="button" href="archive.html">Open archive</a>
          <a class="button" href="metadata.html">Open metadata</a>
        </div>
        <div class="hero-callout">
          <div class="callout-title">Public message</div>
          <div>${escapeHtml(album.public_summary)}</div>
        </div>
      </div>
      <div class="hero-side">
        <div class="cover-card">
          <img src="${COVER}" alt="Album cover art" />
        </div>
        <div class="card">
          <h2>Quick pitch</h2>
          <p>
            A clean, high-contrast landing page for people who want the album title,
            the cover, the track list, and the links without hunting through the repo.
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      ${sectionTitle("What the landing page emphasizes", "The front door is intentionally spare: one statement, one visual anchor, and a path into the rest of the release stack.")}
      <div class="grid-3">
        <div class="card">
          <h3>Statement</h3>
          <p>One paragraph that tells people exactly why the album exists and who it is for.</p>
        </div>
        <div class="card">
          <h3>Artwork</h3>
          <p>The cover art should dominate the top half so the project reads like an actual release, not a blog post.</p>
        </div>
        <div class="card">
          <h3>Routing</h3>
          <p>Buttons and links should hand off cleanly to the dossier, archive mirror, and any live network links.</p>
        </div>
      </div>
    </section>

    <section class="section">
      ${sectionTitle("Track strip", "A visual strip of the eleven tracks to preserve the album sequence on the home surface.")}
      <ol class="track-list">${trackList(album)}</ol>
    </section>

    <section class="section">
      ${sectionTitle("Editorial notes", "This surface should feel like a release, not a generic audio catalog.")}
      <div class="grid-2">
        <div class="card">
          <h3>Use this tone</h3>
          <p>
            Direct, controlled, and slightly severe. The album title, artist identity,
            and audience fit should be obvious before anyone scrolls.
          </p>
        </div>
        <div class="card">
          <h3>Keep links honest</h3>
          <p>
            Only show major-network links once they are actually live. Until then,
            the page should point inward to the dossier and archive mirror.
          </p>
        </div>
      </div>
    </section>
  `;

  pageShell("front-door", album, content);
}

function archivePage(album) {
  const staged = [
    ["Playlist", PLIST],
    ["Cover art", "../staging/art/ZUPREME-Music_to_Win_By-COVER.png"],
    ["Audio masters", "../staging/audio/01 - System Startup Sequence.wav ... 11 - Data Exfiltration.wav"],
  ];
  const content = `
    <section class="hero">
      <p class="eyebrow">Internet Archive mockup</p>
      <h1 class="title" style="max-width: 13ch;">Preservation Mirror</h1>
      <div class="grid-2">
        <div class="card">
          <h2>Item overview</h2>
          <p>
            This is the long-term archive posture: a durable item page with the audio masters,
            the playlist, the cover art, and the same text package that appears everywhere else.
          </p>
          <div class="divider"></div>
          <div class="metric-grid">
            <div class="metric"><strong>Type</strong><span>audio release</span></div>
            <div class="metric"><strong>Rights</strong><span>placeholder until cleared</span></div>
            <div class="metric"><strong>Track count</strong><span>${album.tracklist.length}</span></div>
            <div class="metric"><strong>Bundle state</strong><span>staged</span></div>
          </div>
        </div>
        <div class="card">
          <h2>Archive stance</h2>
          <p>
            The archive should read like a preservation object, not a marketing page:
            explicit metadata, file inventory, and a short rights note that travels with the upload.
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      ${sectionTitle("Staged bundle", "The upload bundle is already staged locally; this page shows how that package can be presented publicly.")}
      <div class="file-list">
        ${staged
          .map(
            ([name, path]) => `
              <div class="file-row">
                <code>${escapeHtml(name)}</code>
                <small>${escapeHtml(path)}</small>
              </div>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section">
      ${sectionTitle("Checksum-friendly checklist", "The archive mirror should be easy to verify, reupload, and compare across revisions.")}
      <div class="grid-3">
        <div class="card">
          <h3>Verify text package</h3>
          <p>Keep the canonical README, album JSON, index, and plan aligned before every upload.</p>
        </div>
        <div class="card">
          <h3>Verify media bundle</h3>
          <p>Carry the playlist, cover art, and masters together as one staged release set.</p>
        </div>
        <div class="card">
          <h3>Preserve notes</h3>
          <p>Keep credits, status, and rights language attached to the archive item so the release survives context loss.</p>
        </div>
      </div>
    </section>

    <section class="section">
      ${sectionTitle("Archive checklist", "The local view mirrors the practical upload sequence.")}
      <div class="timeline">
        <div class="timeline-item">
          <strong>1. Verify</strong>
          <span>Confirm the staged files match the manifest and the track order remains frozen.</span>
        </div>
        <div class="timeline-item">
          <strong>2. Package</strong>
          <span>Bundle the upload set with the same metadata and cover art used on the public pages.</span>
        </div>
        <div class="timeline-item">
          <strong>3. Publish</strong>
          <span>Push the item to the archive mirror once the release is approved and the links are live.</span>
        </div>
      </div>
    </section>
  `;

  pageShell("archive", album, content);
}

function networksPage(album) {
  const networks = [
    ["GitHub Pages", "canonical dossier", album.links?.github_pages || album.canonical_stack?.dossier || "index.html", "live"],
    ["Cloudflare Pages", "primary landing page", album.links?.cloudflare_pages || album.canonical_stack?.front_door || "front-door.html", "live"],
    ["Internet Archive", "preservation mirror", album.links?.internet_archive || album.canonical_stack?.archive || "archive.html", "live"],
    ["Bandcamp", "commercial music storefront", "https://bandcamp.com/", "service"],
    ["SoundCloud", "streaming / preview surface", "https://soundcloud.com/", "service"],
    ["YouTube Music", "catalog presence", "https://music.youtube.com/", "service"],
    ["Spotify", "listener access", album.links?.spotify || "https://open.spotify.com/", "live"],
    ["Tidal", "listener access", album.links?.tidal || "https://tidal.com/", "live"],
    ["Apple Music", "listener access", album.links?.apple_music || "https://music.apple.com/", "live"],
    ["Amazon Music", "listener access", album.links?.amazon_music || "https://music.amazon.com/", "live"],
    ["Shoutcast", "always-on radio layer", "https://www.shoutcast.com/", "service"],
  ];
  const content = `
    <section class="hero">
      <p class="eyebrow">Network link matrix</p>
      <h1 class="title" style="max-width: 14ch;">Distribution Slots</h1>
      <p class="hero-copy" style="max-width: 60rem;">
        This page shows where the major-network links will eventually live without cluttering
        the dossier or landing page. It is meant to stay sparse until the actual URLs exist.
      </p>
    </section>

    <section class="section">
      ${sectionTitle("Major network cards", "The live candidates are the ones that should carry the strongest public signal.")}
      <div class="matrix">
        ${networks
          .map(
            ([name, role, href, state]) => `
              <article class="matrix-card">
                <div class="role">${escapeHtml(role)}</div>
                <h3>${escapeHtml(name)}</h3>
                <p>
                  ${state === "live"
                    ? "This already has a verified public URL and should stay visible."
                    : "This surface is not yet published, so the button points to the closest working service entry point."}
                </p>
                <div class="music-links" style="margin-top: 1rem;">
                  <a class="button ${state === "live" ? "primary" : ""}" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${state === "live" ? "Open live link" : "Open service"}</a>
                </div>
                <span class="empty">${escapeHtml(state)}</span>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section">
      ${sectionTitle("Link policy", "The point is not to broadcast everywhere. The point is to be visible in the right places once the album is ready.")}
      <div class="grid-3">
        <div class="card">
          <h3>Show only live links</h3>
          <p>Never turn the page into a graveyard of dead buttons. Blank is better than stale.</p>
        </div>
        <div class="card">
          <h3>Reuse the same naming</h3>
          <p>Keep title, artist, and public summary aligned across every platform so they can reinforce each other.</p>
        </div>
        <div class="card">
          <h3>Prefer citation-ready pages</h3>
          <p>When a network page is live, point to it from the dossier, the front door, and the archive mirror only where it helps.</p>
        </div>
      </div>
    </section>

    <section class="section">
      ${sectionTitle("Selective discovery", "This project should be easy to recommend without looking spammy or overproduced.")}
      <div class="section-quote">
        A clean stack of one dossier, one landing page, one archive mirror, and a few live network links is enough to make the album look serious.
      </div>
    </section>
  `;

  pageShell("networks", album, content);
}

function metadataPage(album) {
  const trackJson = album.tracklist
    .map(
      (track) => `{
  "@type": "MusicRecording",
  "position": ${track.track},
  "name": "${track.title}",
  "description": "${track.summary}"
}`
    )
    .join(",\n");
  const content = `
    <section class="hero hero-split">
      <div class="hero-copy">
        <p class="eyebrow">Structured metadata mockup</p>
        <h1 class="title" style="max-width: 13ch;">Citation Surface</h1>
        <p>
          This page shows the structured-data posture that helps search engines, crawlers,
          and agents understand the release without guessing at the intent.
        </p>
        <div class="meta-row">
          ${badge("Schema", "MusicAlbum")}
          ${badge("Tracks", String(album.tracklist.length))}
          ${badge("Feed", "RSS / Atom ready")}
        </div>
      </div>
      <div class="hero-side">
        <div class="card">
          <h2>Structured goals</h2>
          <p>
            Make the release easy to discover, easy to cite, and easy to distinguish from generic music pages.
          </p>
        </div>
        <div class="thumb">
          <img src="${COVER}" alt="Album cover art" />
        </div>
      </div>
    </section>

    <section class="section">
      ${sectionTitle("JSON-LD sketch", "This is the sort of structured block that can sit in the HTML head of the public pages.")}
      <div class="code-block">{
  "@context": "https://schema.org",
  "@type": "MusicAlbum",
  "name": "${escapeHtml(album.album)}",
  "byArtist": {
    "@type": "MusicGroup",
    "name": "${escapeHtml(album.artist)}"
  },
  "numTracks": ${album.tracklist.length},
  "description": "${escapeHtml(album.public_summary)}",
  "track": [
${trackJson}
  ]
}</div>
    </section>

    <section class="section">
      ${sectionTitle("Public metadata", "These are the bits that should remain consistent across the dossier, front door, and mirror.")}
      <div class="grid-2">
        <div class="card">
          <h3>Core fields</h3>
          <ul class="bullet-list">
            <li>Album: ${escapeHtml(album.album)}</li>
            <li>Artist: ${escapeHtml(album.artist)}</li>
            <li>Status: ${escapeHtml(album.release_status)}</li>
            <li>Summary: ${escapeHtml(album.public_summary)}</li>
          </ul>
        </div>
        <div class="card">
          <h3>Discovery helpers</h3>
          <ul class="bullet-list">
            <li>robots.txt with crawl intent left open for the public pages</li>
            <li>sitemap.xml for all browsable pages</li>
            <li>RSS or Atom feed for release updates</li>
            <li>plain-language description of the intended audience</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section">
      ${sectionTitle("Track record", "Each track can also be expressed as a MusicRecording if a richer public schema is ever useful.")}
      <ol class="track-list">${trackList(album)}</ol>
    </section>
  `;

  pageShell("metadata", album, content);
}

async function main() {
  const res = await fetch("../album.json", { cache: "no-store" });
  const album = await res.json();
  const page = document.documentElement.dataset.page || "home";
  const renderers = {
    home: homePage,
    dossier: dossierPage,
    "front-door": frontDoorPage,
    archive: archivePage,
    networks: networksPage,
    metadata: metadataPage,
  };
  (renderers[page] || homePage)(album);
}

main().catch((error) => {
  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = `<div class="page"><section class="section"><h2>Mockup error</h2><p>${escapeHtml(error.message)}</p></section></div>`;
  }
  console.error(error);
});
