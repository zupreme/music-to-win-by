# Music to Win By - Archive Package

Status: staging

This manifest defines the canonical text package for the release and the
staged media bundle that should travel together when the Internet Archive
upload is prepared.

## Canonical text package

| File | Size (bytes) | SHA-256 |
| --- | ---: | --- |
| `index.html` | 27584 | `cd83a4b3d444119e7117e3c820511357fcee624f3014832594658d3d1448421b` |
| `album.json` | 5866 | `7fcd3f36b06b3edd57809fb44fdbe1b7e619bca27a9ddade20052e3cc85cfebd` |
| `README.md` | 3452 | `fcfe533a4d6581e7ec3d418dce6a7e3879943e65904cf6a32e3114334e09266c` |
| `PLAN.md` | 3129 | `40032aab0224dc8f763106ec59726702405595ce20faff06dcb7d871a36fee68` |

## Staged media bundle

| File | Size (bytes) | SHA-256 |
| --- | ---: | --- |
| `github-pages/audio/Zupreme-Music_to_Win_By.m3u` | 870 | `311406d62c01e6fbb164cc6542727639aa1a9f86343dcbbd0af1ebdafc43e53c` |
| `staging/art/ZUPREME-Music_to_Win_By-COVER.png` | 2699146 | `f8eb0923fc4723d87d33d20cf3d25323fec0fd81a76e4e4abcad3e517b0bc6d7` |
| `staging/audio/01 - System Startup Sequence.wav` | 53860040 | `95a75fb84f2809f2f25386783c2bc43484ad7c7155b7389e9d83a7c2daadb66d` |
| `staging/audio/02 - MD File.wav` | 62661272 | `dbb044dd35ca4df04d0dd605bc4b5678e123b906c68a066581d5ee9453a0e0f2` |
| `staging/audio/03 - The Agentic Layer.wav` | 66128822 | `b9ae88f396a0147ef9cb1080ecc7645bf11ea01258d8b2e094a6b21d79c8fe5c` |
| `staging/audio/04 - Penetration Testing Mantra.wav` | 68916690 | `4c2844485b10700160873a9972c980e743b777ea5d217c3e3f0531af39c9660f` |
| `staging/audio/05 - The Encoder Tantric.wav` | 64562108 | `bac555f7abb227f1fa227cb674f33459d9f400b52e09198c714d3470c0fa7ee2` |
| `staging/audio/06 - Flow State Activated.wav` | 39160512 | `e3275cf23a9bff1150de832ad868dd7e330141cf688019daeaa7f6f15a3ae35f` |
| `staging/audio/07 - Goal in Focus.wav` | 64066730 | `392adf8a896894ee2fdfc5a15a5c2c37ac6cb6288ff0d1f16d8a945eb55d4ca0` |
| `staging/audio/08 - The Zen of Lyubov.wav` | 140766902 | `47a0bab316af238b6e13bdb8ff9cc8ac66ea9a1b6bd7252e42f9c17c32eb0b59` |
| `staging/audio/09 - Good Ole Boy Behind The Paywall.wav` | 39517664 | `e54c166ec85df77bba3d629fb0b7ea552d320eb3bcd3f7d01ebb3e8c01482d61` |
| `staging/audio/10 - Like a Redteam Cartel.wav` | 53030594 | `a52338e17c999fa3e011be13debab494196e38050ff42b47544cf2d85eedbf99` |
| `staging/audio/11 - Data Exfiltration.wav` | 54516662 | `4f1b1cbfc8295bf159674c9805b195063f8128ff23964bd737d1abe5690837e2` |

## Notes

- Keep track order and titles frozen.
- Keep outbound links blank only for hosts that are not yet verified and live.
- The primary album links are now live on Spotify, Tidal, Apple Music, and Amazon Music.
- The companion single Pasha x Brain Like Prada is now live on Spotify, YouTube Music, Tidal, Apple Music, and Amazon Music.
- Mirror the same public-facing copy across every host.
- The staged media bundle is now complete in `staging/`; `staging/manifest.json`
  remains the local ingest record and is not part of the upload set.

## Archive checklist

1. Verify the canonical text files against this manifest.
2. Verify the staged media bundle against this manifest.
3. Confirm rights and contact copy.
4. Package the upload set for Internet Archive.
