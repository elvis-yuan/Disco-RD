import React from "react";
import { withRouter, NavLink } from "react-router-dom";

export const ServerIcon = props => {
  const { server } = props;
  return (
    <div className="server-icon-wrapper">
      <div className="server-margin-wrapper">
        <NavLink
          // onClick={() => props.fetchAllChannels(server.id)}
          className="button-flex server-btn server-grey blue-btn"
          to={`/servers/${server.id}`}
          activeClassName="selected"
        >
          <div className="server-selector" />
          <h3 className="server-icon-text">
            {server.title.slice(0, 1).toLowerCase()}
          </h3>
        </NavLink>
      </div>
      <p className="server-btn-hover">{server.title}</p>
    </div>
  );
};

export default withRouter(ServerIcon);
