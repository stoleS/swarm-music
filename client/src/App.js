import React, { Component } from "react";
// import openSocket from "socket.io-client";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faBackward,
  faForward,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import Particles from "react-particles-js";
import ParticlesConfig from "./particlesjs-config";
import Modal from "./components/Containers/Modal";
import Search from "./components/Search";
import QueueContainer from "./components/Containers/QueueContainer";
import PlayerContainer from "./components/Containers/PlayerContainer";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./App.css";

// const socket = openSocket("http://10.118.77.123:3004/");
library.add(faPlay, faBackward, faForward, faTrashAlt);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: "none",
      results: [],
      queue: []
    };
  }

  render() {
    const { modal, results, queue } = this.state;
    return (
      <React.Fragment>
        <Search handleSearch={this.handleSearch} />
        <Particles style={{ position: "absolute" }} params={ParticlesConfig} />
        {/* <QueueContainer queue={queue} /> */}
        <div className="App">
          <PlayerContainer />
          <Modal searchResults={results} open={modal} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
