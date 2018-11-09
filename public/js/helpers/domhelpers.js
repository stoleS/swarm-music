const { onSongSelect } = require("./songhelpers");

module.exports = {
  createSearchResult: (song, i) => {
    // Create DOM elements for search results
    const searchItem = document.createElement("div");
    searchItem.classList.add("search-item");
    searchItem.dataset.id = i;

    const thumbnail = document.createElement("img");
    thumbnail.src = song.thumbnail_s;
    thumbnail.classList.add("u-pull-left");

    const songTitle = document.createElement("h5");
    songTitle.textContent = song.title;

    const songChannel = document.createElement("p");
    songChannel.textContent = song.channel;

    searchItem.appendChild(thumbnail);
    searchItem.appendChild(songTitle);
    searchItem.appendChild(songChannel);

    return searchItem;
  },
  createQueueItem: (song, i) => {
    // Create DOM elements for queue items

    const queueItem = document.createElement("tr");
    queueItem.id = song.id;

    const queueItemTitle = document.createElement("td");
    queueItemTitle.textContent = song.title;

    const deleteSong = document.createElement("td");
    const deleteSongButton = document.createElement("i");
    deleteSongButton.id = `delete-${i}`;
    deleteSongButton.classList.add("fas", "fa-trash-alt");
    deleteSong.appendChild(deleteSongButton);

    const playSong = document.createElement("td");
    const playSongButton = document.createElement("i");
    playSongButton.id = `play-${i}`;
    playSongButton.classList.add("fas", "fa-play");
    playSong.appendChild(playSongButton);

    queueItem.appendChild(queueItemTitle);
    queueItem.appendChild(deleteSong);
    queueItem.appendChild(playSong);

    return queueItem;
  },
  clearQueue: queueNode => {
    while (queueNode.hasChildNodes()) {
      queueNode.removeChild(queueNode.lastChild);
    }
  },
  renderQueue: (queueNode, data, document, socket) => {
    data.queue.forEach((song, i) => {
      queueNode.appendChild(module.exports.createQueueItem(song, i + 1));
      document
        .getElementById(`delete-${i + 1}`)
        .addEventListener("click", () => {
          socket.emit("song-delete", {
            id: i + 1
          });
        });
      document.getElementById(`play-${i + 1}`).addEventListener("click", () => {
        socket.emit("toggle-play", {
          state: false
        });
        socket.emit("song-play", {
          id: i + 1
        });
      });
    });
  }
};
