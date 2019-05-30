import React from "react";
import { withRouter, NavLink } from "react-router-dom";

export const ServerIcon = props => {
  const { server } = props;
  return (
    <NavLink
      className="button-flex server-btn blue-btn"
      to={`/servers/${server.id}`}
      activeClassName="selected"
    >
      <div className="server-selector" />
      <h3 className="server-icon-text">
        {server.title.slice(0, 1).toLowerCase()}
      </h3>
      <p>{server.title}</p>
    </NavLink>
  );
};

export default withRouter(ServerIcon);
