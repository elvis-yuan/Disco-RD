import React from "react";
import { NavLink } from "react-router-dom";

class DirectMessageListItem extends React.Component {
  render() {
    const { username, channel_id } = this.props;
    return (
      <NavLink
        activeClassName="current-channel-selected"
        to={`/servers/@me/${channel_id}`}
        className="channel-link-wrapper"
      >
        <div className="channel-container-channel-wrapper">
          <div className="channel-container-channel-name">
            <div className="channel-container-user-icon-container">
              <div className="channel-container-user-icon" />
            </div>
            <h1 className="channel-name">{username}</h1>
          </div>
        </div>
      </NavLink>
    );
  }
}

export default DirectMessageListItem;
