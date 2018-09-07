module.exports = () => {
  const song = [];

  function addSong(songId) {
    song.push(songId);
  }

  return {
    addSong,
    song
  };
};
