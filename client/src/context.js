import React, { Component } from "react";
import openSocket from "socket.io-client";
import ss from "socket.io-stream";

const socket = openSocket("http://192.168.1.6:4000");

const Context = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      search: [],
      lastAdded: "",
      currentlyPlaying: "",
      searchOpen: false,
      searchLoading: false,
      pause: false,
      message: "",
      seek: 0
    };

    socket.on("songSearch", data =>
      this.setState({ search: data.songs, searchLoading: data.loading })
    );

    socket.on("addedSong", song => {
      this.setState({
        lastAdded: song.song.title,
        queue: song.queue,
        currentlyPlaying: song.currentlyPlaying
      });
    });

    socket.on("clientConnected", data => {
      this.setState({
        queue: data.clientQueue,
        currentlyPlaying: data.currentlyPlaying,
        message: data.message
      });
    });

    socket.on("newPlayed", data => {
      this.setState({
        queue: data.clientQueue,
        currentlyPlaying: data.currentlyPlaying
      });
    });

    socket.on("seekPositionCurr", data => {
      this.setState({ seek: data.position });
    });
  }

  handlePlayPause = () => {
    this.setState({ pause: !this.state.pause });
    socket.emit("toggle", {
      playing: this.state.pause
    });
  };

  handleSearch = (e, term) => {
    e.preventDefault();
    this.setState({ searchLoading: true });
    socket.emit("search", {
      str: term
    });
  };

  handleChoice = e => {
    this.handleDialog();
    const choice = e.currentTarget.dataset.id;
    const song = this.state.search[choice];
    socket.emit("songChoice", {
      song
    });
    console.log(song);
    this.setState({ search: [] });
  };

  handleDialog = () => {
    this.setState({ searchOpen: !this.state.searchOpen });
  };

  handleRemove = e => {
    const toRemove = e.currentTarget.dataset.id;
    let removed = [...this.state.queue];
    removed.splice(toRemove, 1);
    this.setState({ queue: removed });
  };

  handlePlay = e => {
    const toPlay = e.currentTarget.dataset.id;
    socket.emit("newPlay", {
      songId: toPlay
    });
  };

  handleBackwards = () => {
    socket.emit("seek", {
      direction: "back"
    });
  };

  handleForwards = () => {
    socket.emit("seek", {
      direction: "forward"
    });
  };

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          handleSearch: this.handleSearch,
          handleChoice: this.handleChoice,
          handleDialog: this.handleDialog,
          handleRemove: this.handleRemove,
          handleSeek: this.handleSeek,
          handleSeekAfter: this.handleSeekAfter,
          handlePlayPause: this.handlePlayPause,
          handleBackwards: this.handleBackwards,
          handleForwards: this.handleForwards
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
