import React from "react";

class ActivityContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
            {/* <div className="mute-button channel-communication-buttons" />
            <div className="defen-button channel-communication-buttons" /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityContainer;
