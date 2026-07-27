# PowerShell Branch

Use this branch on Windows when a desktop app or script wants to hand the
album off to Windows Media Player.

## File

- `background-music.ps1` - COM-based playlist helper for the 11-track album

## Suggested use

```powershell
.\background-music.ps1 -AudioRoot ".\audio" -Volume 65
```

The script builds a relative playlist from the local `audio/` folder so a
copied album bundle stays portable.
