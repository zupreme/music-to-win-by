param(
  [Alias("AudioRoot")]
  [string]$AudioSource = "https://zupreme.github.io/music-to-win-by/audio/",
  [string]$CacheRoot = (Join-Path ([System.IO.Path]::GetTempPath()) "MusicToWinBy"),
  [int]$Volume = 65,
  [bool]$Loop = $true,
  [bool]$Shuffle = $false
)

$Tracks = @(
  @{ Track = 1; Title = "System Startup Sequence"; File = "01 - System Startup Sequence.wav" },
  @{ Track = 2; Title = "MD File"; File = "02 - MD File.wav" },
  @{ Track = 3; Title = "The Agentic Layer"; File = "03 - The Agentic Layer.wav" },
  @{ Track = 4; Title = "Penetration Testing Mantra"; File = "04 - Penetration Testing Mantra.wav" },
  @{ Track = 5; Title = "The Encoder Tantric"; File = "05 - The Encoder Tantric.wav" },
  @{ Track = 6; Title = "Flow State Activated"; File = "06 - Flow State Activated.wav" },
  @{ Track = 7; Title = "Goal in Focus"; File = "07 - Goal in Focus.wav" },
  @{ Track = 8; Title = "The Zen of Lyubov"; File = "08 - The Zen of Lyubov.wav" },
  @{ Track = 9; Title = "Good Ole Boy Behind The Paywall"; File = "09 - Good Ole Boy Behind The Paywall.wav" },
  @{ Track = 10; Title = "Like a Redteam Cartel"; File = "10 - Like a Redteam Cartel.wav" },
  @{ Track = 11; Title = "Data Exfiltration"; File = "11 - Data Exfiltration.wav" }
)

function Start-MusicToWinBy {
  param(
    [string]$Source = $AudioSource,
    [string]$TargetCacheRoot = $CacheRoot,
    [int]$TargetVolume = $Volume,
    [bool]$TargetLoop = $Loop,
    [bool]$TargetShuffle = $Shuffle
  )

  $player = New-Object -ComObject WMPlayer.OCX
  $player.settings.volume = [Math]::Max(0, [Math]::Min(100, $TargetVolume))
  $player.settings.setMode("loop", $TargetLoop)
  $player.settings.setMode("shuffle", $TargetShuffle)

  $playlist = $player.playlistCollection.newPlaylist("Music to Win By")
  foreach ($track in $Tracks) {
    if ($Source -match '^https?://') {
      $cachedPath = Join-Path $TargetCacheRoot $track.File
      if (-not (Test-Path $cachedPath)) {
        New-Item -ItemType Directory -Force -Path (Split-Path $cachedPath -Parent) | Out-Null
        $uri = [System.Uri]::new(($Source.TrimEnd('/') + '/' + [System.Uri]::EscapeDataString($track.File)))
        Invoke-WebRequest -Uri $uri.AbsoluteUri -OutFile $cachedPath
      }
      $path = $cachedPath
    }
    else {
      $path = Join-Path $Source $track.File
      if (-not (Test-Path $path)) {
        throw "Missing track: $path"
      }
    }
    $media = $player.newMedia($path)
    [void]$playlist.appendItem($media)
  }

  $player.currentPlaylist = $playlist
  [void]$player.controls.play()
  return $player
}

Start-MusicToWinBy
