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
            <div className="channel-icon-wrapper" role="button">
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
                      {username}
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
