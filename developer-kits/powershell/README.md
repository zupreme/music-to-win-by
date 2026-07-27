# PowerShell Branch

Use this branch on Windows when a desktop app or script wants to hand the
album off to Windows Media Player. The script defaults to the hosted Pages
audio bundle and caches downloads automatically.

## File

- `background-music.ps1` - COM-based playlist helper for the 11-track album

## Suggested use

```powershell
.\background-music.ps1 -Volume 65
```

Pass a local path to `-AudioSource` if you already mirrored the files. When
left alone, the script downloads each track from the GitHub Pages audio URL
into a cache folder before building the playlist.

Playlist URL:
`https://zupreme.github.io/music-to-win-by/audio/Zupreme-Music_to_Win_By.m3u`
