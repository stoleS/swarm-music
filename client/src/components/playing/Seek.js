import React, { Component } from "react";
import Slider from "@material-ui/lab/Slider";

export class Seek extends Component {
  render() {
    return (
      <div>
        <Slider value={75} aria-labelledby="label" style={{ padding: 0 }} />
      </div>
    );
  }
}

export default Seek;
