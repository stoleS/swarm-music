import React, { Component } from "react";
import Playback from "./components/playing/Playback";
import Queue from "./components/queue/Queue";
import Add from "./components/Search";
import "./App.css";
import { Provider } from "./context";
import { Grid } from "@material-ui/core";

class App extends Component {
  render() {
    return (
      <Provider>
        <div style={{ padding: 20 }}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6} className="left-panel">
              <Playback />
            </Grid>
            <Grid item xs={12} sm={6} className="right-panel">
              <Queue />
            </Grid>
          </Grid>
          <Add />
        </div>
      </Provider>
    );
  }
}

export default App;
