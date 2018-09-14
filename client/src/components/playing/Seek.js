import React from "react";
import { Consumer } from "../../context";
import Slider from "rc-slider/lib/Slider";
import "rc-slider/assets/index.css";

export default () => {
  return (
    <Consumer>
      {({ state, handleSeek, handleSeekAfter }) => (
        <Slider
          value={state.seek}
          onChange={handleSeek}
          onAfterChange={handleSeekAfter}
        />
      )}
    </Consumer>
  );
};
