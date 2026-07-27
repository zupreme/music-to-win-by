# Python Branch

Use this branch when a desktop app or internal tool needs album playback
without building a browser player first. The helper defaults to the hosted
GitHub Pages audio bundle and caches tracks locally on demand.

Playlist URL:
`https://zupreme.github.io/music-to-win-by/audio/Zupreme-Music_to_Win_By.m3u`

## File

- `background_music.py` - `pygame`-based helper for the 11-track album

## Setup

```bash
python -m pip install pygame
```

## Suggested use

```python
from background_music import BackgroundMusic

player = BackgroundMusic(volume=0.6)
player.play()
```

Pass a local folder into `audio_dir` if you want to override the hosted
bundle. Otherwise the helper pulls from the Pages audio URL and stores the
downloads under your cache directory.
