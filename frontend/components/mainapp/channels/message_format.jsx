import React from "react";

class MessageFormat extends React.Component {
  componentDidMount() {}

  render() {
    const users = this.props.users
      ? Object.values(this.props.users).length
      : null;

    const userName =
      users && this.props.users[this.props.message.user_id]
        ? this.props.users[this.props.message.user_id].username
        : "User Left";

    const date = new Date(this.props.message.created_at);
    const localTime = date.toLocaleTimeString("en-US", {
      timeZone: "America/New_York"
    });

    const localDate = date.toLocaleDateString("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      month: "short",
      day: "2-digit"
    });

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
                {localDate} {localTime}
              </time>
            </h2>
          </div>
          <div className="message-icon-margin-wrapper">
            <div className="message-container">
              <div className="message-text">{this.props.message.body}</div>
            </div>
          </div>
        </div>
        <hr className="message-divider" />
      </div>
    );
  }
}

export default MessageFormat;
