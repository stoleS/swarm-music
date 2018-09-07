const { getYoutubeId } = require("../helpers/getID");
const { ytResults } = require("../helpers/searchSongs");
const yt = require("ytdl-core");

module.exports = {
  // Get first 5 video results from youtube api
  searchTrack: async data => {
    try {
      const trackName = data;
      const result = await ytResults(trackName, 5);
      return result;
    } catch (err) {
      return err;
    }
  }
};
