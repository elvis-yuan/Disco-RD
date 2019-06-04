import React from "react";

class MessageFormat extends React.Component {
  render() {
    const users = this.props.users
      ? Object.values(this.props.users).length
      : null;
    const userName = users && users > 1 ? "test" : "";
    debugger;
    return (
      <div className="message-block-wrapper">
        <div className="message-block-margin">
          <div className="message-creator-container">
            <div aria-hidden="true" className="message-creator-avatar">
              <div className="message-creator-avatar-image" />
            </div>
            <h2 className="message-created-information">
              <span className="message-username">{userName}</span>
              <time className="message-timestamp">Today at 10:45 PM</time>
            </h2>
          </div>
          <div className="message-icon-margin-wrapper">
            <div className="message-container">
              <div className="message-text">{this.props.message.body}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageFormat;
