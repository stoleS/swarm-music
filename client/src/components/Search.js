import React from 'react';

export default ({ handleSearch }) => (
  <form onSubmit={e => handleSearch(e)}>
    <input
      className="u-full-width"
      type="text"
      placeholder="Enter song name..."
      id="song-search"
      name="search"
      autoComplete="off"
    />
    <input id="myBtn" className="button-primary u-full-width" type="submit" value="Search" />
  </form>
);
