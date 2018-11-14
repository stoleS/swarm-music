import React, { Component } from "react";
import openSocket from "socket.io-client";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faBackward,
  faForward,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import Search from "./components/Search";
import Thumbnail from "./components/Thumbnail";
import SongInfo from "./components/SongInfo";
import Controls from "./components/Controls";
import Modal from "./components/Containers/Modal";
import QueueContainer from "./components/Containers/QueueContainer";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./App.css";

const socket = openSocket("http://10.118.74.123:3004/");
library.add(faPlay, faBackward, faForward, faTrashAlt);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: "none",
      results: [],
      queue: [],
      currentlyPlaying: [],
      playing: false,
      progress: 0
    };

    socket.on("search-result", data => {
      this.setState({ results: data.songs });
    });

    socket.on("player-state", data => {
      const { queue, currentlyPlaying, playing } = data;
      this.setState({
        queue,
        currentlyPlaying,
        playing
      });
    });

    socket.on("progress-status", data => {
      this.setState({ progress: data.value });
    });

    socket.on("chosen-song", data => {
      const { queue, currentlyPlaying } = data;
      this.setState({
        queue,
        currentlyPlaying
      });
    });
  }

  handleSearch = e => {
    e.preventDefault();
    this.setState({ modal: "block" });
    socket.emit("search-song", {
      songName: e.target.elements.search.value
    });
  };

  handleSongSelect = e => {
    let selectedSongId;
    if (e.target.dataset.id) {
      selectedSongId = e.target.dataset.id;
    } else {
      selectedSongId = e.target.parentNode.dataset.id;
    }
    socket.emit("song-selected", {
      songId: selectedSongId
    });
    this.setState({ modal: "none" });
  };

  handleSongDelete = e => {
    const songId = e.target.dataset.id;
    socket.emit("song-delete", {
      id: songId
    });
  };

  render() {
    const { modal, results, queue, currentlyPlaying, progress } = this.state;
    return (
      <div className="App">
        <Search handleSearch={this.handleSearch} />
        <Thumbnail currentlyPlaying={currentlyPlaying} />
        <SongInfo currentlyPlaying={currentlyPlaying} progress={progress} />
        <Controls />
        <h5 className="queue-text">Queue:</h5>
        <QueueContainer
          queue={queue}
          handleSongDelete={this.handleSongDelete}
        />
        <Modal
          searchResults={results}
          open={modal}
          handleSongSelect={this.handleSongSelect}
        />
      </div>
    );
  }
}

export default App;
