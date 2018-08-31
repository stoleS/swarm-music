const YouTube = require("simple-youtube-api");
const { ytApiKey } = require("../keys/keys");
const youtube = new YouTube(ytApiKey);

module.exports = {
  ytResults: async (str, resultsNum) => {
    let resultsID = [];
    try {
      await youtube.searchVideos(str, resultsNum).then(results => {
        for (const resultId of results) {
          resultsID.push(resultId.title);
        }
      });
      if (resultsID.length === 0) {
        resultsID.push("No results found...");
      }
      return resultsID;
    } catch (err) {
      return err;
    }
  }
};
