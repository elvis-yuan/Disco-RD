import React from "react";
import MessageInputContainer from "./message_input_container";
import ChannelHeadingContainer from "./channel_heading_container";
import MessageFormatContainer from "./message_format_container";
import { receiveUser } from "../../../actions/user_actions";

class ChannelChat extends React.Component {
  constructor(props) {
    super(props);
    this.currentChannelId = this.props.match.params.channelId;
    this.state = { messages: [] };
    this.bottom = React.createRef();
  }

  componentDidMount() {
    this.props.fetchChannel(this.currentChannelId);
    this.createSocketConnection();
    // App.cable.subscriptions.create(
    //   {
    //     channel: "ChatChannel",
    //     channel_id: this.props.match.params.channelId,
    //     user_id: this.props.currentUserId
    //   },
    //   {
    //     received: data => {
    //       if (data.type === "message") {
    //         this.setState({
    //           messages: this.state.messages.concat({
    //             body: data.message.body,
    //             user_id: data.message.user_id,
    //             created_at: data.message.created_at,
    //             updated_at: data.message.updated_at
    //           })
    //         });
    //       }

    //       if (data.type === "user") {
    //         this.props.fetchUser(data.user);
    //       }
    //     },
    //     speak: function(data) {
    //       return this.perform("speak", data);
    //     },
    //     findUser: function(data) {
    //       return this.perform("findUser", data);
    //     }
    //   }
    // );
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.channelId !== this.props.match.params.channelId
    ) {
      App.cable.subscriptions.subscriptions[0].unsubscribe();

      this.currentChannelId = this.props.match.params.channelId;
      this.setState({ messages: [] });
      this.props.fetchChannel(this.currentChannelId);

      this.createSocketConnection();

      if (this.bottom.current !== null) {
        this.bottom.current.scrollIntoView();
      }
    }
  }

  createSocketConnection() {
    App.cable.subscriptions.create(
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
    const { channels, messages } = this.props;
    const allMessages = this.state.messages.map((message, index) => {
      return (
        <div key={index}>
          <MessageFormatContainer message={message} />
          {/* <div key={index} className="message-text-container">
          {message.body}
          <div ref={this.bottom} />
        </div> */}
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

    const title =
      Object.values(channels).length > 0
        ? channels[this.props.match.params.channelId].title
        : "";

    return (
      <div className="chat-component-container">
        <ChannelHeadingContainer channelTitle={title} />
        <div className="chatroom-container">
          <div className="chat-box-component">
            <div className="message-window">
              <div className="message-window-scroller">
                <div className="message-list">
                  {history}
                  {allMessages}
                </div>
              </div>
            </div>
            <MessageInputContainer
              currentId={this.currentChannelId}
              channels={this.props.channels}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChannelChat;
