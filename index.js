const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const clientManager = require("./controllers/clientManager");
const ClientManager = clientManager();
const yt = require("ytdl-core");
const { searchTrack } = require("./controllers/tracks");
const songManager = require("./helpers/getID");
const SongManager = songManager();
const cors = require("cors");
const { playSong } = require("./routes/play");

// Define app
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/play", playSong);

// Define socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let queue = [];
let clientQueue = [];
let currentlyPlaying = "";
let playingStatus = false;
let seek = 0;
let seekPosition = 0;

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  ClientManager.addClient(socket);
  socket.emit("clientConnected", {
    clientQueue,
    currentlyPlaying,
    message: "Hello there"
  });

  socket.on("disconnect", () => {
    ClientManager.removeClient(socket);
  });

  socket.on("search", data => {
    searchTrack(data.str).then(result => {
      socket.emit("songSearch", {
        songs: result,
        loading: false
      });
    });
  });

  socket.on("songChoice", data => {
    queue.push({
      title: data.song.title,
      id: data.song.id
    });
    clientQueue = queue.slice(1);
    currentlyPlaying = queue[0].title;

    io.emit("addedSong", {
      song: data.song,
      queue,
      currentlyPlaying
    });
  });

  socket.on("newPlay", songToPlay => {
    const newPlay = songToPlay.songId;
    const matchSong = clientQueue.filter((song, i) => i == newPlay);
    currentlyPlaying = matchSong[0].title;
    clientQueue.splice(newPlay, 1);
    queue.splice(newPlay + 1, 1);
    io.emit("newPlayed", {
      clientQueue,
      currentlyPlaying
    });
  });

  socket.on("toggle", data => {
    playingStatus = data.playing;
    io.emit("playPause", {
      playing: playingStatus
    });
  });

  socket.on("seek", data => {
    io.emit("seekDirection", {
      direction: data.direction
    });
  });

  socket.on("seekPosition", data => {
    seekPosition = data.value;
    io.emit("seekPositionCurr", {
      position: seekPosition
    });
  });
});

// Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());

// Error catcher
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Handle errors
app.use((err, req, res, next) => {
  const error = app.get("end") === "development" ? err : {};
  const status = err.status || 500;

  // After that respond to client
  res.status(status).json({
    error: {
      message: error.message
    }
  });

  // Push to the terminal
  console.error(err);
});

// Define port and start the server
const port = process.env.PORT || 4000;
http.listen(port, () => console.log(`Server started on port ${port}`));
