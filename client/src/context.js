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
      searchOpen: false
    };

    socket.on("songSearch", data => this.setState({ search: data.songs }));

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
  }

  handleSearch = (e, term) => {
    e.preventDefault();
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

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          handleSearch: this.handleSearch,
          handleChoice: this.handleChoice,
          handleDialog: this.handleDialog
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
