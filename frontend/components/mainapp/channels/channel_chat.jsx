import React from "react";
import MessageInputContainer from "./message_input_container";

class ChannelChat extends React.Component {
  constructor(props) {
    super(props);
    this.currentChannelId = parseInt(
      this.props.history.location.pathname.split("/")[3]
    );
    this.state = { messages: [] };
    this.bottom = React.createRef();
  }

  componentDidMount() {
    this.props.fetchChannel(this.currentChannelId);
    App.cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received: data => {
          this.setState({ messages: this.state.messages.concat(data.message) });
        },
        speak: function(data) {
          return this.perform("speak", data);
        }
      }
    );
  }

  componentDidUpdate() {
    if (this.bottom.current !== null) {
      this.bottom.current.scrollIntoView();
    }
  }

  render() {
    const { channels, messages } = this.props;
    const allMessages = this.state.messages.map((message, index) => (
      <div key={index} className="message-text-container">
        {message}
        <div ref={this.bottom} />
      </div>
    ));

    debugger;
    const oldMessages =
      Object.values(channels).length > 0
        ? channels[this.currentChannelId].message_ids.map(
            message_id => messages[message_id]
          )
        : //
          null;

    //  const history = oldMessages.length > 0 ?
    //         oldMessages.map((message,index)=> )
    //   debugger;
    // const oldMessages = currentChannel?

    return (
      <div className="chatroom-container">
        <div className="message-list">
          {oldMessages}
          {allMessages}
        </div>
        <MessageInputContainer currentId={this.currentChannelId} />
      </div>
    );
  }
}

export default ChannelChat;
