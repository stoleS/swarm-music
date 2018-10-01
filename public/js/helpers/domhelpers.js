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

    const queueItemChannel = document.createElement("td");
    queueItemChannel.textContent = song.channel;

    const deleteSong = document.createElement("td");
    const deleteSongButton = document.createElement("a");
    deleteSongButton.id = i;
    deleteSongButton.classList.add("button", "button-delete");
    deleteSongButton.textContent = "Delete";
    deleteSong.appendChild(deleteSongButton);

    const playSong = document.createElement("td");
    const playSongButton = document.createElement("a");
    playSongButton.classList.add("button", "button-primary");
    playSongButton.textContent = "Play";
    playSong.appendChild(playSongButton);

    queueItem.appendChild(queueItemTitle);
    queueItem.appendChild(queueItemChannel);
    queueItem.appendChild(deleteSong);
    queueItem.appendChild(playSong);

    return queueItem;
  }
};
