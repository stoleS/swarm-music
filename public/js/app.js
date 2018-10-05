import io from "socket.io-client";
import particles from "./particles";
import { handleSubmit } from "./helpers/songhelpers";
import {
  createSearchResult,
  createQueueItem,
  clearQueue,
  renderQueue
} from "./helpers/domhelpers";

const { particlesJS } = window;

const socket = io();

particlesJS.load("particles-js", "./js/particlesjs-config.json", () => {
  console.log("callback - particles.js config loaded");
});

const songName = document.getElementById("songName");
const songChannel = document.getElementById("songChannel");
const songThumbnail = document.getElementById("thumbnail");
const snack = document.getElementById("snackbar");

let searchTerm;
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
  const resultsNode = document.getElementById("search-result");
  while (resultsNode.hasChildNodes()) {
    resultsNode.removeChild(resultsNode.lastChild);
  }
  const fragment = document.createDocumentFragment();
  data.songs.forEach((song, i) => {
    // Add songs to result list
    fragment.appendChild(createSearchResult(song, i));
  });
  resultsNode.appendChild(fragment);
  const results = document.querySelectorAll(".search-item");
  results.forEach(result =>
    result.addEventListener("click", e => {
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
  // If no sons are playing/queue is empty, play selected song
  if (playingState === false) {
    // Put song data in respective nodes
    songName.textContent = data.title;
    songChannel.textContent = data.channel;
    songThumbnail.style.backgroundImage = `url('${data.thumbnail}')`;
    // Load new song by passing id to player
    player.loadVideoById(data.id);
    // Set playing to true
    playingState = true;

    if (data.queuePlay) {
      const queueNode = document.getElementById("queue");
      clearQueue(queueNode);
      renderQueue(queueNode, data, document, socket);
    }
  } else if (data.queue.length > 1) {
    // If songs are playing
    // Add selected song to the queue
    document
      .getElementById("queue")
      .appendChild(createQueueItem(data, data.orderInQueue));
    document
      .getElementById(`delete-${data.orderInQueue}`)
      .addEventListener("click", () => {
        socket.emit("song-delete", {
          id: data.orderInQueue
        });
      });
    document
      .getElementById(`play-${data.orderInQueue}`)
      .addEventListener("click", () => {
        playingState = false;
        socket.emit("toggle-play", {
          state: playingState
        });
        socket.emit("song-play", {
          id: data.orderInQueue
        });
      });
    snack.innerHTML = `<b>${data.title}</b> has been added to the queue`;
    snack.classList.add("show");
    nextInQueue = data.nextToPlay;
    setTimeout(() => {
      snack.classList.remove("show");
    }, 3000);
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

// Handle updated queue from the server
socket.on("updated-queue", data => {
  const queueNode = document.getElementById("queue");
  clearQueue(queueNode);
  renderQueue(queueNode, data, document, socket);
});

window.onPlayerReady = event => {
  event.target.setVolume(20);
};

// Handle song end
window.onPlayerStateChange = event => {
  const queueList = document.getElementById("queue");
  if (event.data === 0) {
    playingState = false;
    if (queueList.hasChildNodes()) {
      queueList.removeChild(queueList.childNodes[0]);
    }
    socket.emit("song-end", {});
  }
};
