import React from "react";
import { NavLink } from "react-router-dom";

class DirectMessageListItem extends React.Component {
  render() {
    const { username, channel_id, active } = this.props;
    let presence = active ? (
      <div className="online-indicator">
        <p className="indicator-hover">Online</p>
      </div>
    ) : (
      <div className="offline-indicator">
        <p className="indicator-hover">Offline</p>
      </div>
    );
    return (
      <NavLink
        activeClassName="current-channel-selected"
        to={`/servers/@me/${channel_id}`}
        className="direct-message-link-wrapper"
      >
        <div className="direct-container-channel-wrapper">
          <div className="channel-container-channel-name">
            <div className="channel-container-user-icon-container">
              <div className="channel-container-user-icon">
                <div className="indicator-mask" />
                {presence}
              </div>
            </div>
            <h1 className="direct-message-name">{username}</h1>
          </div>
        </div>
      </NavLink>
    );
  }
}

export default DirectMessageListItem;
