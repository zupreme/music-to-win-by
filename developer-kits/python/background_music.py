from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path
from threading import Event, Thread
from time import sleep
from typing import Sequence
from urllib.parse import quote, urljoin
from urllib.request import urlopen

try:
    import pygame
except ImportError as exc:  # pragma: no cover - documentation helper
    raise RuntimeError("Install pygame first: python -m pip install pygame") from exc


@dataclass(frozen=True)
class Track:
    number: int
    title: str
    file_name: str


TRACKS: tuple[Track, ...] = (
    Track(1, "System Startup Sequence", "01 - System Startup Sequence.wav"),
    Track(2, "MD File", "02 - MD File.wav"),
    Track(3, "The Agentic Layer", "03 - The Agentic Layer.wav"),
    Track(4, "Penetration Testing Mantra", "04 - Penetration Testing Mantra.wav"),
    Track(5, "The Encoder Tantric", "05 - The Encoder Tantric.wav"),
    Track(6, "Flow State Activated", "06 - Flow State Activated.wav"),
    Track(7, "Goal in Focus", "07 - Goal in Focus.wav"),
    Track(8, "The Zen of Lyubov", "08 - The Zen of Lyubov.wav"),
    Track(9, "Good Ole Boy Behind The Paywall", "09 - Good Ole Boy Behind The Paywall.wav"),
    Track(10, "Like a Redteam Cartel", "10 - Like a Redteam Cartel.wav"),
    Track(11, "Data Exfiltration", "11 - Data Exfiltration.wav"),
)

DEFAULT_AUDIO_BASE_URL = "https://zupreme.github.io/music-to-win-by/audio/"
DEFAULT_PLAYLIST_URL = "https://zupreme.github.io/music-to-win-by/audio/Zupreme-Music_to_Win_By.m3u"


class BackgroundMusic:
    def __init__(
        self,
        audio_dir: Path | str = DEFAULT_AUDIO_BASE_URL,
        playlist_url: str = DEFAULT_PLAYLIST_URL,
        tracks: Sequence[Track] = TRACKS,
        volume: float = 0.65,
        loop: bool = True,
        cache_dir: Path | str | None = None,
    ) -> None:
        self.audio_dir = audio_dir
        self.playlist_url = playlist_url
        self.tracks = tuple(tracks)
        self.volume = max(0.0, min(1.0, volume))
        self.loop = loop
        self.cache_dir = Path(cache_dir) if cache_dir is not None else default_cache_dir()
        self._index = 0
        self._paused = False
        self._stop = Event()
        self._watcher: Thread | None = None

        pygame.mixer.init()
        pygame.mixer.music.set_volume(self.volume)

    def _is_remote_source(self) -> bool:
        return isinstance(self.audio_dir, str) and self.audio_dir.startswith(("http://", "https://"))

    def _remote_url_for(self, index: int) -> str:
        base_url = str(self.audio_dir)
        return urljoin(base_url if base_url.endswith("/") else f"{base_url}/", quote(self.tracks[index].file_name))

    def _cache_path_for(self, index: int) -> Path:
        return self.cache_dir / self.tracks[index].file_name

    def _local_path_for(self, index: int) -> Path:
        if self._is_remote_source():
            return self._cache_path_for(index)
        return Path(self.audio_dir) / self.tracks[index].file_name

    def _ensure_cached(self, index: int) -> Path:
        path = self._local_path_for(index)
        if path.exists():
            return path

        if not self._is_remote_source():
            raise FileNotFoundError(path)

        path.parent.mkdir(parents=True, exist_ok=True)
        with urlopen(self._remote_url_for(index)) as response, path.open("wb") as handle:
            handle.write(response.read())
        return path

    def _load(self, index: int) -> None:
        path = self._ensure_cached(index)
        pygame.mixer.music.load(str(path))
        pygame.mixer.music.set_volume(self.volume)

    def _ensure_watcher(self) -> None:
        if self._watcher and self._watcher.is_alive():
            return
        self._stop.clear()
        self._watcher = Thread(target=self._watch, daemon=True)
        self._watcher.start()

    def _watch(self) -> None:
        while not self._stop.wait(0.25):
            if self._paused:
                continue
            if pygame.mixer.music.get_busy():
                continue
            if self.loop:
                self.next_track()
            else:
                self.stop()

    def play(self, index: int | None = None) -> None:
        if index is not None:
            self._index = index % len(self.tracks)
        self._paused = False
        self._load(self._index)
        pygame.mixer.music.play()
        self._ensure_watcher()

    def pause(self) -> None:
        self._paused = True
        pygame.mixer.music.pause()

    def resume(self) -> None:
        self._paused = False
        pygame.mixer.music.unpause()

    def stop(self) -> None:
        self._stop.set()
        self._paused = False
        pygame.mixer.music.stop()

    def next_track(self) -> None:
        self._index = (self._index + 1) % len(self.tracks)
        self.play(self._index)

    def previous_track(self) -> None:
        self._index = (self._index - 1) % len(self.tracks)
        self.play(self._index)

    def set_volume(self, volume: float) -> float:
        self.volume = max(0.0, min(1.0, volume))
        pygame.mixer.music.set_volume(self.volume)
        return self.volume


def default_audio_source() -> str:
    return DEFAULT_AUDIO_BASE_URL


def default_cache_dir() -> Path:
    cache_root = Path(os.environ.get("XDG_CACHE_HOME", Path.home() / ".cache"))
    return cache_root / "music-to-win-by"


if __name__ == "__main__":  # pragma: no cover - example entrypoint
    player = BackgroundMusic()
    player.play()
    try:
        while True:
            sleep(1)
    except KeyboardInterrupt:
        player.stop()
