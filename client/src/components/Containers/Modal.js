import React from "react";
import ResultItem from "../ResultItem";

export default function Modal({ searchResults, open, handleSongSelect }) {
  return (
    <div style={{ display: open }} id="myModal" className="modal">
      <div className="modal-content">
        <div id="search-result">
          {searchResults.map((result, i) => (
            <ResultItem
              key={result.id}
              result={result}
              songId={i}
              handleSongSelect={handleSongSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
