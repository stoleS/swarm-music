import React, { Component } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://192.168.1.6:5000");

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
      searchLoading: false
    };

    socket.on("songSearch", data =>
      this.setState({ search: data.songs, searchLoading: data.loading })
    );

    socket.on("addedSong", song =>
      this.setState({
        lastAdded: song.song.title,
        queue: song.queue,
        currentlyPlaying: song.currentlyPlaying
      })
    );

    socket.on("clientConnected", data => {
      this.setState({
        queue: data.clientQueue,
        currentlyPlaying: data.currentlyPlaying
      });
    });

    socket.on("newPlayed", data => {
      this.setState({
        queue: data.clientQueue,
        currentlyPlaying: data.currentlyPlaying
      });
    });
  }

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
          handlePlay: this.handlePlay
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
