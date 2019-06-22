import React from "react";
import DirectMessageInputContainer from "../direct_message/direct_message_input_container";
import ChannelHeadingContainer from "../channels/channel_heading_container";
import MessageFormatContainer from "../channels/message_format_container";
import { receiveUser } from "../../../actions/user_actions";
import ServerConnectedUsers from "../servers/server_connected_users_container";

class DirectMessage extends React.Component {
  constructor(props) {
    super(props);
    this.currentChannelId = this.props.match.params.channelId;
    this.state = { messages: [] };
    this.bottom = React.createRef();
  }

  componentDidMount() {
    this.props.fetchMessages(this.props.match.params.channelId);
    this.createSocketConnection();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.channelId !== this.props.match.params.channelId
    ) {
      this.props.fetchMessages(this.props.match.params.channelId);
      App[prevProps.match.params.channelId].unsubscribe();

      this.currentChannelId = this.props.match.params.channelId;
      this.setState({ messages: [] });

      this.createSocketConnection();
    }
    if (this.bottom.current !== null) {
      this.bottom.current.scrollIntoView();
    }
  }

  componentWillUnmount() {
    App[this.currentChannelId].unsubscribe();
  }

  createSocketConnection() {
    App[this.currentChannelId] = App.cable.subscriptions.create(
      {
        channel: "ChatChannel",
        channel_id: this.props.match.params.channelId,
        user_id: this.props.currentUserId
      },
      {
        received: data => {
          if (data.type === "message") {
            this.setState({
              messages: this.state.messages.concat({
                body: data.message.body,
                user_id: data.message.user_id,
                created_at: data.message.created_at,
                updated_at: data.message.updated_at
              })
            });
          }

          if (data.type === "user") {
            this.props.fetchUser(data.user);
          }
        },
        speak: function(data) {
          return this.perform("speak", data);
        },
        findUser: function(data) {
          return this.perform("findUser", data);
        }
      }
    );
  }

  render() {
    const {
      channels,
      messages,
      currentUser,
      currentUserId,
      users,
      currentDm
    } = this.props;

    const current_channel = channels[this.currentChannelId];
    const dm_id = current_channel
      ? current_channel.server_id === currentUser.direct_message_id
        ? current_channel.dm_id
        : current_channel.server_id
      : null;

    const user =
      Object.values(users).length > 0
        ? Object.values(users).filter(user => user.direct_message_id === dm_id)
        : null;

    const username = user.length > 0 ? user[0].username : null;

    const allMessages = this.state.messages.map((message, index) => {
      return (
        <div key={index}>
          <MessageFormatContainer message={message} />
          <div ref={this.bottom} />
        </div>
      );
    });

    const oldMessages =
      Object.values(channels).length > 0 && Object.values(messages).length > 0
        ? channels[this.props.match.params.channelId].message_ids.map(
            message_id => messages[message_id]
          )
        : null;

    const history =
      oldMessages !== null &&
      !oldMessages.includes(undefined) &&
      !oldMessages.includes(null)
        ? oldMessages.map((message, index) => (
            <div key={index}>
              <MessageFormatContainer message={message} />
              <div ref={this.bottom} />
            </div>
          ))
        : null;

    return (
      <div className="chat-component-container">
        <div className="channel-heading-wrapper">
          <div className="channel-heading-channel-title">
            <div className="channel-icon-wrapper">
              <div className="direct-message-at">
                <svg
                  x="0"
                  y="0"
                  name="Nova_At"
                  className="at-symbol"
                  aria-hidden="false"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2C6.486 2 2 6.486 2 12C2 17.515 6.486 22 12 22C14.039 22 15.993 21.398 17.652 20.259L16.521 18.611C15.195 19.519 13.633 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12V12.782C20 14.17 19.402 15 18.4 15L18.398 15.018C18.338 15.005 18.273 15 18.209 15H18C17.437 15 16.6 14.182 16.6 13.631V12C16.6 9.464 14.537 7.4 12 7.4C9.463 7.4 7.4 9.463 7.4 12C7.4 14.537 9.463 16.6 12 16.6C13.234 16.6 14.35 16.106 15.177 15.313C15.826 16.269 16.93 17 18 17L18.002 16.981C18.064 16.994 18.129 17 18.195 17H18.4C20.552 17 22 15.306 22 12.782V12C22 6.486 17.514 2 12 2ZM12 14.599C10.566 14.599 9.4 13.433 9.4 11.999C9.4 10.565 10.566 9.399 12 9.399C13.434 9.399 14.6 10.565 14.6 11.999C14.6 13.433 13.434 14.599 12 14.599Z"
                  />
                </svg>
              </div>
              <h2 className="channel-header-channel-title">{username}</h2>
            </div>
          </div>
        </div>
        <div className="chatroom-container">
          <div className="chat-box-component">
            <div className="message-window">
              <div className="message-window-scroller">
                <div className="message-list">
                  <div className="message-list-image">
                    <h1>
                      This is the beginning of your direct message history with{" "}
                      @<span className="username">{username}</span>.
                    </h1>
                  </div>
                  {history}
                  {allMessages}
                </div>
              </div>
            </div>
            <DirectMessageInputContainer
              currentId={this.currentChannelId}
              channels={this.props.channels}
              channelTitle={username}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DirectMessage;
