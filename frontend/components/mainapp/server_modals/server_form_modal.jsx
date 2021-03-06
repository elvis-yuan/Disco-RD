import React from "react";
import { openModal } from "../../../actions/modal_actions";

class ServerFormModal extends React.Component {
  render() {
    const message = [
      "Hi there Adam!",
      "Oh, Another server huh?",
      "This server is on the house!",
      "the next one is gonna' cost you"
    ];
    return (
      <div className="server-modal-form">
        <h1 className="server-modal-header">
          {message[Math.floor(Math.random() * message.length)]}
        </h1>
        <div className="server-form-actions">
          <div
            className="server-action-container server-create-container"
            onClick={this.props.createModal}
          >
            <h1 className="server-container-header blue-text">create</h1>
            <p className="server-plain-text">
              Create a new server and invite your friends. It's free!
            </p>
            <div className="create-action-icon" />
            <button className="action-btns create-action-btn">
              Create a server
            </button>
          </div>
          <div
            className="server-action-container"
            onClick={this.props.joinModal}
          >
            <h1 className="server-container-header green-text">join</h1>
            <p className="server-plain-text">
              Enter an Instant Invite and join your friend's server.
            </p>
            <div className="join-action-icon" />
            <button
              className="action-btns join-action-btn"
            >
              Join a server
            </button>
          </div>
          <div className="server-center-image">or</div>
        </div>
      </div>
    );
  }
}

export default ServerFormModal;
