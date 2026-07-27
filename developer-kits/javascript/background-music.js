const DEFAULT_BASE_URL = "https://zupreme.github.io/music-to-win-by/audio/";
const DEFAULT_PLAYLIST_URL = "https://zupreme.github.io/music-to-win-by/audio/Zupreme-Music_to_Win_By.m3u";

const TRACKS = [
  { track: 1, title: "System Startup Sequence", file: "01 - System Startup Sequence.wav" },
  { track: 2, title: "MD File", file: "02 - MD File.wav" },
  { track: 3, title: "The Agentic Layer", file: "03 - The Agentic Layer.wav" },
  { track: 4, title: "Penetration Testing Mantra", file: "04 - Penetration Testing Mantra.wav" },
  { track: 5, title: "The Encoder Tantric", file: "05 - The Encoder Tantric.wav" },
  { track: 6, title: "Flow State Activated", file: "06 - Flow State Activated.wav" },
  { track: 7, title: "Goal in Focus", file: "07 - Goal in Focus.wav" },
  { track: 8, title: "The Zen of Lyubov", file: "08 - The Zen of Lyubov.wav" },
  { track: 9, title: "Good Ole Boy Behind The Paywall", file: "09 - Good Ole Boy Behind The Paywall.wav" },
  { track: 10, title: "Like a Redteam Cartel", file: "10 - Like a Redteam Cartel.wav" },
  { track: 11, title: "Data Exfiltration", file: "11 - Data Exfiltration.wav" },
];

function normalizeBaseUrl(baseUrl) {
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
}

function resolveTrackUrl(track, baseUrl) {
  return new URL(track.file, normalizeBaseUrl(baseUrl)).toString();
}

function clampIndex(nextIndex, length) {
  if (length === 0) {
    return 0;
  }
  return ((nextIndex % length) + length) % length;
}

function safePlay(audio) {
  const maybePromise = audio.play();
  if (maybePromise && typeof maybePromise.catch === "function") {
    maybePromise.catch(() => {});
  }
  return maybePromise;
}

export function createBackgroundMusic(options = {}) {
  const {
    baseUrl = DEFAULT_BASE_URL,
    playlistUrl = DEFAULT_PLAYLIST_URL,
    tracks = TRACKS,
    autoPlay = false,
    loop = true,
    volume = 0.65,
    onTrackChange = null,
  } = options;

  const audio = new Audio();
  audio.preload = "auto";
  audio.crossOrigin = "anonymous";
  audio.volume = volume;

  let index = 0;

  function loadTrack(nextIndex) {
    index = clampIndex(nextIndex, tracks.length);
    const track = tracks[index];
    audio.src = resolveTrackUrl(track, baseUrl);
    if (typeof onTrackChange === "function") {
      onTrackChange(track, index);
    }
    return track;
  }

  function play(nextIndex = index) {
    loadTrack(nextIndex);
    return safePlay(audio);
  }

  function pause() {
    audio.pause();
  }

  function stop() {
    audio.pause();
    audio.currentTime = 0;
  }

  function next() {
    return play(index + 1);
  }

  function previous() {
    return play(index - 1);
  }

  function setVolume(nextVolume) {
    audio.volume = Math.max(0, Math.min(1, Number(nextVolume)));
    return audio.volume;
  }

  audio.addEventListener("ended", () => {
    if (!loop || tracks.length === 0) {
      stop();
      return;
    }
    next();
  });

  if (tracks.length > 0) {
    loadTrack(0);
  }

  if (autoPlay && tracks.length > 0) {
    queueMicrotask(() => {
      safePlay(audio);
    });
  }

  return {
    audio,
    playlistUrl,
    tracks,
    get currentIndex() {
      return index;
    },
    get currentTrack() {
      return tracks[index] ?? null;
    },
    loadTrack,
    play,
    pause,
    stop,
    next,
    previous,
    setVolume,
  };
}

export { TRACKS, DEFAULT_BASE_URL, DEFAULT_PLAYLIST_URL, resolveTrackUrl };
