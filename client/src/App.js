import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client";
const socket = openSocket("http://192.168.1.6:5000");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      pause: true,
      response: [],
      search: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    socket.on("response", data => this.setState({ response: data.songs }));
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

  render() {
    const songList = this.state.response.map((song, i) => {
      return <li key={i}>{song}</li>;
    });

    return (
      <div>
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
      </div>
    );
  }
}

export default App;
