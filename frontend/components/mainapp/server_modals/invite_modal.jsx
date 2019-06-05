import React from "react";

class InviteModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentServer = this.props.servers[
      this.props.history.location.pathname.split("/")[2]
    ];
    return (
      <div className="invite-modal-container">
        <div className="invite-modal-header">
          <h1 className="invite-modal-h1">
            invite friends to {currentServer.title}
          </h1>
        </div>
        <div className="invite-input-container">
          <div className="invite-input-wrapper">
            <div className="invite-subtext">
              Share this link with others to grant access to your server!
            </div>
            <div className="invite-input-box">
              <input
                type="text"
                className="invite-input"
                value={currentServer.invitation_code}
                disabled
              />
              {/* <button className="invite-copy-button">
                <span className="input-copy-text">Copy</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InviteModal;
