const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const clientManager = require("./controllers/clientManager");
const ClientManager = clientManager();
const { searchTrack } = require("./controllers/tracks");

// Define app
const app = express();

// Define socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let queue = [];
let clientQueue = [];
let currentlyPlaying = "";

io.on("connection", socket => {
  ClientManager.addClient(socket);
  socket.emit("clientConnected", {
    clientQueue,
    currentlyPlaying
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
      queue: clientQueue,
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
const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Server started on port ${port}`));
