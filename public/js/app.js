import io from "socket.io-client";
import { handleSubmit } from "./helpers/songhelpers";
import { createSearchResult, createQueueItem } from "./helpers/domhelpers";

const socket = io();
let searchTerm;

const songName = document.getElementById("songName");
const songChannel = document.getElementById("songChannel");
const songThumbnail = document.getElementById("thumbnail");
const snack = document.getElementById("snackbar");

let playingState = false;
let nextInQueue = "";

window.addEventListener("load", () => {
  window.addEventListener("keyup", e => {
    searchTerm = e.target.value;
  });
  document.querySelector(".search-form").addEventListener("submit", e => {
    handleSubmit(e);
    socket.emit("search-song", {
      songName: searchTerm
    });
  });
  document.getElementById("toggle").addEventListener("click", () => {
    playingState = !playingState;
    socket.emit("toggle-play", {
      state: playingState
    });
  });
  document.getElementById("forward").addEventListener("click", () => {
    player.seekTo(player.getDuration() - 3, true);
  });
});

// PROGRESS BAR
const value = document.getElementById("progress-bar");
setInterval(() => {
  if (player !== undefined) {
    if (player.getCurrentTime && player.getCurrentTime() !== 0) {
      const fraction = (player.getCurrentTime() / player.getDuration()) * 100;
      value.style.width = `${fraction}%`;
      socket.emit("progress", {
        value: fraction
      });
    }
  }
}, 200);

// When app recieves search results from the server
socket.on("search-result", data => {
  const fragment = document.createDocumentFragment();
  data.songs.forEach((song, i) => {
    // Add songs to result list
    fragment.appendChild(createSearchResult(song, i));
  });
  document.getElementById("search-result").appendChild(fragment);
  const results = document.querySelectorAll(".search-item");
  results.forEach(result =>
    result.addEventListener("click", e => {
      document.getElementById("Default").click();
      const { id } = e.target.parentNode.dataset;
      const songId = id || e.target.dataset.id;
      socket.emit("song-selected", {
        songId
      });
    })
  );
});

// When app recieves data of selected song from search
socket.on("chosen-song", data => {
  if (playingState === false) {
    songName.textContent = data.title;
    songChannel.textContent = data.channel;
    songThumbnail.style.backgroundImage = `url('${data.thumbnail}')`;
    player.loadVideoById(data.id);
    nextInQueue = data.nextToPlay;
    playingState = true;
  } else if (data.queue.length > 1) {
    document.getElementById("queue").appendChild(createQueueItem(data));
    snack.innerHTML = `<b>${data.title}</b> has been added to the queue`;
    snack.classList.add("show");
    nextInQueue = data.nextToPlay;
    setTimeout(() => {
      snack.classList.remove("show");
    }, 5000);
  }
});

// When app recieves data about playing state
socket.on("playing-status", data => {
  if (data.playing === true) {
    player.playVideo();
  } else if (data.playing === false) {
    player.pauseVideo();
  }
  playingState = data.playing;
});

window.onPlayerReady = event => {
  event.target.setVolume(20);
};

// Handle song end
window.onPlayerStateChange = event => {
  if (event.data === 0) {
    playingState = false;
    if (document.getElementById("queue").hasChildNodes()) {
      document.getElementById(nextInQueue).remove();
    }
    socket.emit("song-end", {});
  }
};
