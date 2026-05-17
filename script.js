const songs = [
  {
    title: "Song 1",
    file: "songs/song1.mp3"
  },
  {
    title: "Song 2",
    file: "songs/song2.mp3"
  },
  {
    title: "Song 3",
    file: "songs/song3.mp3"
  }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const title = document.getElementById("title");

let currentSong = 0;
let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  audio.src = song.file;
}

loadSong(songs[currentSong]);

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener("click", () => {
  currentSong++;
  
  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  loadSong(songs[currentSong]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  loadSong(songs[currentSong]);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const progressPercent =
    (audio.currentTime / audio.duration) * 100;

  progress.value = progressPercent || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime =
    (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});
