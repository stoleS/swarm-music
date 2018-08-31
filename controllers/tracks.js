const { getYoutubeId } = require("../helpers/getID");
const { ytResults } = require("../helpers/searchSongs");
const yt = require("ytdl-core");

module.exports = {
  searchTrack: async data => {
    try {
      const trackName = data;
      const result = await ytResults(trackName, 5);
      return result;
    } catch (err) {
      return err;
    }
  },

  addTrack: async (req, res, next) => {
    try {
      const trackName = req.params.trackId;
      const id = await getYoutubeId(trackName);
      res.set("content-type", "audio/mp3");
      res.set("accept-ranges", "bytes");
      let stream = yt(`https://www.youtube.com/watch?v=${id}`, {
        filter: "audioonly"
      });
      stream.on("data", chunk => {
        res.write(chunk);
        console.log(chunk);
      });
      stream.on("end", () => {
        res.end();
      });
    } catch (err) {
      next(err);
    }
  }
};
