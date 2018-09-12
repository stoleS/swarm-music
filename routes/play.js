const express = require("express");
const yt = require("ytdl-core");
const songManager = require("../helpers/getID");
const SongManager = songManager();
const bodyParser = require("body-parser");

module.exports = {
  playSong: (req, res, next) => {
    if (req.body.id) {
      console.log(req.body.id);
      yt(`https://www.youtube.com/watch?v=${req.body.id}`, {
        filter: "audioonly"
      }).pipe(res);
    } else {
      res.status(200);
    }
  }
};
