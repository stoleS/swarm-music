import io from "socket.io-client";
import { handleSubmit } from "./helpers/songhelpers";
import { createSearchResult } from "./helpers/domhelpers";

const socket = io();

const songName = document.getElementById("songName");
const songChannel = document.getElementById("songChannel");

window.addEventListener("load", () => {
  document
    .querySelector(".search-form")
    .addEventListener("submit", e => handleSubmit(e));
});

socket.on("search-result", data => {
  const fragment = document.createDocumentFragment();
  data.songs.forEach((song, i) => {
    // Add songs to result list
    fragment.appendChild(createSearchResult(song, i));
  });
  document.getElementById("search-result").appendChild(fragment);
});

socket.on("chosen-song", data => {
  songName.textContent = data.title;
  songChannel.textContent = data.channel;
  player.loadVideoById(data.id);
});

/* const searchTerm = inputValue;
socket.emit("search-song", {
  songName: searchTerm
}); */
