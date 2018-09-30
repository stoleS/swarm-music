const express = require("express");

// Define app
const app = express();

// Define socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { searchSong } = require("./helpers/song-search");

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.sendFile("index.html");
});

let searchResult = [];
let playing = false;
const queue = [];
let nextToPlay = "";

io.on("connection", socket => {
  console.log(`${socket.id} connected`);

  // Handle song search
  socket.on("search-song", data => {
    searchSong(data.songName).then(result => {
      searchResult = result;
      socket.emit("search-result", {
        songs: result
      });
    });
  });

  // Handle selected song
  socket.on("song-selected", data => {
    queue.push(searchResult[data.songId]);
    if (queue.length === 2) {
      nextToPlay = queue[1].id;
    }
    socket.emit("chosen-song", {
      id: searchResult[data.songId].id,
      title: searchResult[data.songId].title,
      channel: searchResult[data.songId].channel,
      thumbnail: searchResult[data.songId].thumbnail_h,
      queue,
      nextToPlay
    });
  });

  // On progress data

  // Handle play/pause
  socket.on("toggle-play", data => {
    playing = data.state;
    socket.emit("playing-status", {
      playing
    });
  });

  // Handle song end
  socket.on("song-end", () => {
    queue.shift();
    if (queue.length > 1) {
      nextToPlay = queue[1].id;
    } else {
      nextToPlay = "";
    }
    if (queue.length > 0) {
      socket.emit("chosen-song", {
        id: queue[0].id,
        title: queue[0].title,
        channel: queue[0].channel,
        thumbnail: queue[0].thumbnail_h,
        queue,
        nextToPlay
      });
    }
  });
});

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
