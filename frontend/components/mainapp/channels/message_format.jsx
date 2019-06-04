import React from "react";

class MessageFormat extends React.Component {
  render() {
    const users = this.props.users
      ? Object.values(this.props.users).length
      : null;
    // debugger;
    const userName =
      users && users > 1
        ? this.props.users[this.props.message.user_id].username
        : "loading";
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
              <time className="message-timestamp">
                {this.props.message.created_at}
              </time>
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
