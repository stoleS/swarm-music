import React from 'react';

export default () => (
  <form>
    <input
      className="u-full-width"
      type="text"
      placeholder="Enter song name..."
      id="song-search"
    />
    <input
      id="myBtn"
      className="button-primary u-full-width"
      type="submit"
      value="Search"
    />
  </form>
);
