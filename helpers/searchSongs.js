const YouTube = require("simple-youtube-api");
const { ytApiKey } = require("../keys/keys");
const youtube = new YouTube(ytApiKey);

module.exports = {
  ytResults: async (str, resultsNum) => {
    let resultsID = [];
    if (str) {
      try {
        await youtube.searchVideos(str, resultsNum).then(results => {
          for (const resultId of results) {
            resultsID.push({
              id: resultId.id,
              title: resultId.title,
              channel: resultId.channel.title,
              thumbnail_m: resultId.thumbnails.medium.url,
              thumbnail_s: resultId.thumbnails.default.url
            });
          }
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
