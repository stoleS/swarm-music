import React, { Component } from "react";
import Playback from "./components/playing/Playback";
import "./App.css";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  AppBar,
  Toolbar
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import openSocket from "socket.io-client";
const socket = openSocket("http://192.168.1.6:5000");

const styles = {
  card: {
    width: 320
  },
  media: {
    objectFit: "cover"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-evenly"
  },
  playIcon: {
    height: 38,
    width: 38
  },
  flex: {
    flexGrow: 1
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      pause: true,
      response: [],
      search: "",
      queue: [],
      currentlyPlaying: "",
      lastAdded: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    socket.on("response", data => this.setState({ response: data.songs }));
    socket.on("addedSong", song =>
      this.setState({
        lastAdded: song.song.title,
        queue: song.queue,
        currentlyPlaying: song.currentlyPlaying
      })
    );
    socket.on("clientConnected", data => {
      this.setState({
        queue: data.queue,
        currentlyPlaying: data.currentlyPlaying
      });
    });
    //this.url = "http://localhost:5000/tracks/";
    //this.audio = new Audio(this.url);
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    socket.emit("search", {
      str: this.state.search
    });
  }

  handleChoice = e => {
    const choice = e.currentTarget.dataset.id;
    const song = this.state.response[choice];
    socket.emit("songChoice", {
      song
    });
    this.setState({ response: [] });
  };

  render() {
    const songList = this.state.response.map((song, i) => {
      return (
        <li key={i} data-id={i} onClick={this.handleChoice}>
          {song.title}
        </li>
      );
    });
    const currentQueue = this.state.queue.map((song, i) => {
      return <li key={i}>{song}</li>;
    });
    const addedSong = this.state.lastAdded;
    const currentlyPlaying = this.state.currentlyPlaying;

    return (
      <div style={{ padding: 20 }}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6} className="left-panel">
            <Playback />
          </Grid>
          <Grid item xs={12} sm={6} className="right-panel">
            <Paper style={styles.card}>
              <List
                component="nav"
                subheader={
                  <AppBar position="static" color="default">
                    <Toolbar variant="dense">
                      <IconButton color="inherit" aria-label="Menu">
                        <ShuffleIcon />
                      </IconButton>
                      <Typography
                        style={styles.flex}
                        variant="title"
                        color="inherit"
                        align="center"
                      >
                        Queue
                      </Typography>
                      <IconButton color="inherit" aria-label="repeat">
                        <RepeatOneIcon />
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                }
              >
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Sent mail" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Drafts" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Inbox" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Drafts" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
      /* <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Song Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Search" />
        </form>
        {songList}
        {this.state.lastAdded !== "" && <h2>Added to the queue:</h2>}
        {addedSong}
        {currentQueue.length !== 0 && <h1>QUEUE:</h1>}
        {currentQueue}
        {currentlyPlaying !== "" && <h1>Currently playing:</h1>}
        {currentlyPlaying}
      </div> */
    );
  }
}

export default App;
