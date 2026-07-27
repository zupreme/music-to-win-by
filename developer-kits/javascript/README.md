# JavaScript Branch

Use this branch when you want the album to run as browser background music.

## File

- `background-music.js` - reusable browser controller for the 11-track album

## Defaults

- Base audio URL:
  `https://zupreme.github.io/music-to-win-by/audio/`
- Local bundle path:
  `./audio/`

## Suggested use

```html
<script type="module">
  import { createBackgroundMusic } from "./background-music.js";

  const player = createBackgroundMusic({
    baseUrl: "./audio/",
    autoPlay: false,
    volume: 0.55,
  });

  document.querySelector("#play").addEventListener("click", () => player.play());
</script>
```

The module exposes the track list, `play()`, `pause()`, `stop()`, `next()`,
`previous()`, and `setVolume()`.
