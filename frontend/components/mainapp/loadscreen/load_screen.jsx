import React from "react";

const LoadScreen = props => {
  return (
    <div id="loading-screen">
      <img
        src="https://gifimage.net/wp-content/uploads/2018/11/discord-picture-loading-gif.gif"
        alt=""
        className="load-gif"
      />

      <p className="jibberish">Decrypting Application</p>
      <p className="loading-text">Loading</p>
    </div>
  );
};

export default LoadScreen;
