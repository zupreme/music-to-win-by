# Go Branch

Use this branch when a Go service, worker, or desktop wrapper should play the
album from a local `audio/` folder.

## File

- `background_music.go` - process-based player using `ffplay`

## Requirements

- `ffplay` from FFmpeg, or swap the command to `mpv`

## Suggested use

```go
player := &Player{AudioDir: "./audio", Loop: true, Volume: 60}
if err := player.Run(context.Background()); err != nil {
    log.Fatal(err)
}
```

The helper walks the 11-track album in order and reuses the local `audio/`
folder so the bundle stays portable.
