const YouTube = require("simple-youtube-api");
require("dotenv").load();

const youtube = new YouTube(process.env.API_KEY);

module.exports = {
  getResults: async (str, resultsNum) => {
    const resultsID = [];
    if (str) {
      try {
        await youtube.searchVideos(str, resultsNum).then(results => {
          results.forEach(song => {
            resultsID.push({
              id: song.id,
              title: song.title,
              channel: song.channel.title,
              thumbnail_m: song.thumbnails.medium.url,
              thumbnail_s: song.thumbnails.default.url
            });
          });
        });
        if (resultsID.length === 0) {
          resultsID.push("No results found...");
        }
      } catch (err) {
        return err;
      }
    }
    return resultsID;
  }
};
