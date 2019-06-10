import React from "react";
import { NavLink } from "react-router-dom";

class ActivityContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDm();
  }

  render() {
    const { dmChannels, dmIds, users, currentUser } = this.props;
    const dms =
      dmChannels !== undefined && dmIds !== undefined
        ? dmChannels.concat(dmIds)
        : null;

    const channels = dms
      ? dms.map(channel_id => this.props.channels[channel_id])
      : null;

    const serverIds = {};

    channels
      ? channels.forEach(channel => {
          if (channel.server_id !== currentUser.direct_message_id) {
            serverIds[channel.server_id] = channel;
          } else {
            serverIds[channel.dm_id] = channel;
          }
        })
      : null;

    const titles = Object.values(users)
      .filter(user => user !== currentUser)
      .map((user, index) => {
        if (serverIds[user.direct_message_id] !== undefined) {
          return (
            <NavLink
              to={`/servers/@me/${serverIds[user.direct_message_id].id}`}
              key={index}
            >
              {user.username}
            </NavLink>
          );
        }
      });

    return (
      <div className="channel-index-container">
        <div className="channel-name-links">
          <div className="channel-container-server-information">
            <div className="activity-header">
              <div className="activity-container-header">
                <span className="channel-container-server-name">
                  {/* {serverTitle} */} {this.props.currentUser.username}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="channel-list-container-scroll">
          <div className="channel-text-channel-catagory">
            <div className="channel-text-channel">
              <div className="activity-link-wrapper">
                <div className="activity-container-channel-wrapper">
                  <div className="activity-container-channel-name">
                    <h1 className="channel-name">Direct Messages</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="channel-list-container">{titles}</div>
        </div>
        <div className="channel-container-user-information">
          <div className="channel-container-user-icon-container">
            <div className="channel-container-user-icon" />
          </div>
          <div className="channel-username-container">
            <div className="channel-container-user-username">
              {this.props.currentUser.username}
            </div>
          </div>
          <div className="channel-button-container">
            <div className="mute-button channel-communication-buttons" />
            <div className="defen-button channel-communication-buttons" />
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityContainer;
