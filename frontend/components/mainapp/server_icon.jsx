import React from "react";

export const ServerIcon = props => {
  const { server } = props;
  return (
    <>
      <button>
        <div className="selector">|</div>
        <h3 className="server-icon-text">
          {server.title.slice(0, 1).toLowerCase()}
        </h3>
        <p>{server.title}</p>
      </button>
    </>
  );
};

export default ServerIcon;
