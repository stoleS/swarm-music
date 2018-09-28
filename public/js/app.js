import io from "socket.io-client";
import { handleSubmit } from "./helpers/songhelpers";
import { createSearchResult } from "./helpers/domhelpers";

const socket = io();
let searchTerm;

const songName = document.getElementById("songName");
const songChannel = document.getElementById("songChannel");

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
});

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
      socket.emit("song-selected", {
        songId: e.target.parentNode.dataset.id
      });
    })
  );
});

socket.on("chosen-song", data => {
  songName.textContent = data.title;
  songChannel.textContent = data.channel;
  player.loadVideoById(data.id);
});
