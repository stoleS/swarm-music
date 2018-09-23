const { getResults } = require("./song-helpers.js");

module.exports = {
  searchSong: async data => {
    try {
      const songName = data;
      const result = await getResults(songName, 5);
      return result;
    } catch (err) {
      return err;
    }
  }
};
