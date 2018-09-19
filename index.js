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

io.on("connection", socket => {
  console.log(`${socket.id} connected`);

  socket.on("search-song", data => {
    searchSong(data.songName).then(result => {
      socket.emit("search-result", {
        songs: result
      });
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
