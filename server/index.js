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
let orderInQueue;
const nextToPlay = "";

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
    orderInQueue = queue.length - 1;
    socket.emit("chosen-song", {
      id: searchResult[data.songId].id,
      title: searchResult[data.songId].title,
      channel: searchResult[data.songId].channel,
      thumbnail: searchResult[data.songId].thumbnail_h,
      orderInQueue,
      queue
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
    if (queue.length > 0) {
      socket.emit("chosen-song", {
        id: queue[0].id,
        title: queue[0].title,
        channel: queue[0].channel,
        thumbnail: queue[0].thumbnail_h,
        orderInQueue,
        queue
      });
    }
  });

  // Handle song delete
  socket.on("song-delete", data => {
    queue.splice(data.id, 1);
    const [, ...updatedQueue] = queue;
    socket.emit("updated-queue", {
      queue: updatedQueue
    });
  });

  // Handle song play
  socket.on("song-play", data => {
    const { id } = queue[data.id];
    const { title } = queue[data.id];
    const { channel } = queue[data.id];
    const thumbnail = queue[data.id].thumbnail_h;
    queue.splice(data.id, 1);
    const [, ...updatedQueue] = queue;
    socket.emit("chosen-song", {
      queuePlay: true,
      id,
      title,
      channel,
      thumbnail,
      queue: updatedQueue
    });
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
