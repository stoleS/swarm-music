import React from "react";

export default function Progress() {
  return (
    <React.Fragment>
      <p>0:00</p>
      <div id="progress-bar" style={{ width: `100%` }} />
      <p>3:56</p>
    </React.Fragment>
  );
}
