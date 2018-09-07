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
      play: false,
      pause: true,
      message: ""
    };

    this.url = "http://192.168.1.6:4000/play";

    socket.on("songSearch", data =>
      this.setState({ search: data.songs, searchLoading: data.loading })
    );

    socket.on("addedSong", song => {
      this.setState({
        lastAdded: song.song.title,
        queue: song.queue,
        currentlyPlaying: song.currentlyPlaying
      });
      const data = {
        id: this.state.queue[0].id
      };
      const params = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        mode: "cors",
        body: JSON.stringify(data),
        method: "POST"
      };
      fetch(this.url, params).catch(err => console.log(err));
      this.audio = new Audio(this.url);
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

    ss(socket).on("Queen", stream => {});
  }

  handlePlayPause = () => {
    this.setState({ play: !this.state.play, pause: !this.state.pause });
    if (this.state.play === true) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
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

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          handleSearch: this.handleSearch,
          handleChoice: this.handleChoice,
          handleDialog: this.handleDialog,
          handleRemove: this.handleRemove,
          handlePlayPause: this.handlePlayPause
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
