module.exports = {
  handleSubmit: e => {
    e.preventDefault();
    // document.getElementById("search-form").reset();
    // Remove previous search results
    /* const resultList = document.getElementById("search-result");
    if (resultList.hasChildNodes()) {
      while (resultList.hasChildNodes()) {
        resultList.removeChild(resultList.lastChild);
      }
    } */
  },
  onSongSelect: e => {
    const songId = e.target.parentNode.dataset.id;
    socket.emit("song-selected", {
      songId
    });
  }
};
