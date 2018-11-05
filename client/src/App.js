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
import QueueItem from "./components/QueueItem";
import ResultItem from "./components/ResultItem";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./App.css";

const socket = openSocket("http://127.0.0.1:4000");
library.add(faPlay, faBackward, faForward, faTrashAlt);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: "none",
      songs: [
        "Some Random - Title",
        "Second Random - Title",
        "Third Random - Title",
        "Fourth Title - Random"
      ],
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
      const { queue } = data;
      const { currentlyPlaying } = data;
      const { playing } = data;
      this.setState({
        queue,
        currentlyPlaying,
        playing
      });
    });

    socket.on("progress-status", data => {
      console.log(data.value);
      this.setState({ progress: data.value });
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

  render() {
    const { currentlyPlaying } = this.state;
    const { progress } = this.state;
    return (
      <div className="App">
        <Search handleSearch={this.handleSearch} />
        <Thumbnail />

        <SongInfo currentlyPlaying={currentlyPlaying} progress={progress} />
        <Controls />
        <h5 className="queue-text">Queue:</h5>
        <table className="u-full-width">
          <tbody id="queue">
            {this.state.songs.map((song, i) => (
              <QueueItem key={i} song={song} />
            ))}
          </tbody>
        </table>
        <div
          style={{ display: this.state.modal }}
          id="myModal"
          className="modal"
        >
          <div className="modal-content">
            <div id="search-result">
              {this.state.results.map((result, i) => (
                <ResultItem
                  key={result.id}
                  result={result}
                  songId={i}
                  handleSongSelect={this.handleSongSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
