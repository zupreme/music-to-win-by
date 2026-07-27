#!/usr/bin/env python3
"""Stage the Zdrop album files into a release-ready local package."""

from __future__ import annotations

import json
import shutil
from dataclasses import asdict, dataclass
from pathlib import Path


SOURCE_ROOT = Path("/home/zupreme/Zdrop/Zupreme - Music to Win By - MASTERED")
TARGET_ROOT = Path(__file__).resolve().parent.parent / "staging"
MANIFEST_PATH = TARGET_ROOT / "manifest.json"


@dataclass(frozen=True)
class TrackItem:
    track: int
    title: str
    source_file: str
    staged_file: str
    duration_hint: int | None = None


def read_playlist_lines(path: Path) -> list[str]:
    return [
        line.strip()
        for line in path.read_text(encoding="utf-8", errors="replace").splitlines()
        if line.strip()
    ]


def parse_playlist(path: Path) -> list[tuple[int, str, str]]:
    entries: list[tuple[int, str, str]] = []
    pending_seconds: int | None = None
    pending_title: str | None = None
    for line in read_playlist_lines(path):
        if line.startswith("#EXTINF:"):
            prefix, _, title = line.partition(",")
            pending_seconds = int(prefix.split(":", 1)[1])
            pending_title = title.strip()
            continue
        if line.startswith("#EXT"):
            continue
        if pending_title is not None and pending_seconds is not None:
            entries.append((pending_seconds, pending_title, line))
            pending_seconds = None
            pending_title = None
    return entries


def safe_copy(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)


def stage_album(source_root: Path = SOURCE_ROOT, target_root: Path = TARGET_ROOT) -> dict:
    playlist = source_root / "Zupreme-Music_to_Win_By.m3u"
    cover = source_root / "ZUPREME-Music_to_Win_By-COVER.png"

    if not playlist.exists():
        raise FileNotFoundError(f"Missing playlist: {playlist}")
    if not cover.exists():
        raise FileNotFoundError(f"Missing cover art: {cover}")

    audio_root = target_root / "audio"
    art_root = target_root / "art"
    target_root.mkdir(parents=True, exist_ok=True)
    audio_root.mkdir(exist_ok=True)
    art_root.mkdir(exist_ok=True)

    safe_copy(cover, art_root / cover.name)

    tracks: list[TrackItem] = []
    ignored_duplicates: list[str] = []
    staged_playlist_lines = ["#EXTM3U"]

    for duration_hint, raw_title, rel_name in parse_playlist(playlist):
        if "(1)" in rel_name:
            ignored_duplicates.append(rel_name)
            continue

        src = source_root / rel_name
        if not src.exists():
            matches = list(source_root.glob(f"**/{rel_name}"))
            if not matches:
                raise FileNotFoundError(f"Playlist references missing audio file: {rel_name}")
            src = matches[0]

        track_no = len(tracks) + 1
        title = raw_title.replace("#Zupreme - ", "", 1).strip()
        staged_name = f"{track_no:02d} - {title}.wav"
        dst = audio_root / staged_name
        safe_copy(src, dst)
        staged_playlist_lines.append(f"#EXTINF:{duration_hint},#Zupreme - {title}")
        staged_playlist_lines.append(f"audio/{staged_name}")
        tracks.append(
            TrackItem(
                track=track_no,
                title=title,
                source_file=str(src),
                staged_file=str(dst.relative_to(target_root)),
                duration_hint=duration_hint,
            )
        )

    (target_root / playlist.name).write_text("\n".join(staged_playlist_lines) + "\n", encoding="utf-8")

    manifest = {
        "album": "Music to Win By",
        "artist": "#Zupreme",
        "credits": 'Zeaun "Zupreme" Zarrieff',
        "source_root": str(source_root),
        "staging_root": str(target_root),
        "cover_art": f"art/{cover.name}",
        "playlist": playlist.name,
        "tracks": [asdict(track) for track in tracks],
        "ignored_duplicates": ignored_duplicates,
    }

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    return manifest


def main() -> int:
    manifest = stage_album()
    print(json.dumps(manifest, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
