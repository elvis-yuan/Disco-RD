import React from "react";
import { NavLink } from "react-router-dom";
import DirectMessageListItemContainer from "../direct_message/direct_message_list_item_container";

class ActivityContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDm();
  }

  render() {
    const { dmChannels, dmIds, users, currentUser, openModal } = this.props;
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
            <DirectMessageListItemContainer
              key={index}
              channel_id={serverIds[user.direct_message_id].id}
              username={user.username}
              dm_id={serverIds[user.direct_message_id].id}
            />
          );
        }
      });

    return (
      <div className="channel-index-container">
        <div className="channel-name-links">
          <div className="channel-container-server-information">
            <div className="activity-header" onClick={openModal}>
              <div className="activity-container-header">
                <div className="direct-message-button">
                  <span className="channel-container-server-name">
                    Start a conversation
                  </span>
                </div>
                {/* <span className="channel-container-server-name">
                  {serverTitle} {this.props.currentUser.username}
                </span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="channel-list-container-scroll">
          <div className="channel-text-channel-catagory">
            <div className="direct-message-text-channel">Direct Messages</div>
          </div>
          <div className="channel-list-container">{titles}</div>
        </div>
        <div className="channel-container-user-information">
          <div className="channel-container-user-icon-container">
            <div className="channel-container-user-icon">
              <div className="indicator-mask" />
              <div className="online-indicator" />
            </div>
          </div>
          <div className="channel-username-container">
            <div className="channel-container-user-username">
              {this.props.currentUser.username}
            </div>
          </div>
          <div className="channel-button-container">
            {/* <div className="mute-button channel-communication-buttons" />
            <div className="defen-button channel-communication-buttons" /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityContainer;
