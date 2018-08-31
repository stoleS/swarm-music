const getYTID = require("get-youtube-id");
const axios = require("axios");
const { ytApiKey } = require("../keys/keys");

module.exports = {
  getYoutubeId: async str => {
    try {
      if (!str.indexOf("youtube.com")) {
        return getYTID(str);
      } else {
        const body = await axios(
          `https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(
            str
          )}&key=${ytApiKey}`
        );
        if (body.data.items[0] === undefined) {
          return null;
        } else {
          return body.data.items[0].id.videoId;
        }
      }
    } catch (err) {
      return err;
    }
  }
};
