# Go Branch

Use this branch when a Go service, worker, or desktop wrapper should play the
album from the hosted GitHub Pages bundle or a local mirror.

## File

- `background_music.go` - process-based player using `ffplay`

## Requirements

- `ffplay` from FFmpeg, or swap the command to `mpv`

## Suggested use

```go
player := &Player{Loop: true, Volume: 60}
if err := player.Run(context.Background()); err != nil {
    log.Fatal(err)
}
```

By default the helper pulls from the hosted Pages audio URL and caches tracks
under the local user cache directory. Set `AudioDir` to a local folder if you
already mirrored the bundle.
