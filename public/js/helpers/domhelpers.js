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

    searchItem.addEventListener("click", onSongSelect);

    return searchItem;
  }
};
