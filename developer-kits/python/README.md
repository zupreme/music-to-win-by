# Python Branch

Use this branch when a desktop app or internal tool needs album playback
without building a browser player first.

## File

- `background_music.py` - `pygame`-based helper for the 11-track album

## Setup

```bash
python -m pip install pygame
```

## Suggested use

```python
from pathlib import Path

from background_music import BackgroundMusic

player = BackgroundMusic(Path("./audio"), volume=0.6)
player.play()
```

The helper expects the album audio files in a local `audio/` directory and
will advance through the track list while the process stays alive.
