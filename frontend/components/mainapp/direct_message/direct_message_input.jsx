import React from "react";

class DirectMessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      channel_id: this.props.currentChannelId,
      user_id: this.props.user_id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.typingStatus = this.typingStatus.bind(this);
  }

  typingStatus() {
    let data = {
      channel_id: this.props.currentChannelId,
      user_id: this.props.user_id
    };
    App[this.props.match.params.channelId].typing(data);
  }

  handleChange(field) {
    let type = this.typingStatus;
    return e => {
      this.setState({ [field]: e.target.value });
      type();
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.channelId !== this.props.match.params.channelId
    ) {
      this.setState({ channel_id: this.props.match.params.channelId });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.body.split(" ").join("") !== "" &&
      this.state.body.length > 0
    ) {
      App[this.props.match.params.channelId].speak(this.state);
      this.setState({ body: "" });
    }
  }

  render() {
    let alert = this.props.typing ? (
      <h1 className="typing-alert">{this.props.channelTitle} is typing...</h1>
    ) : null;
    return (
      <form className="message-input-form" onSubmit={this.handleSubmit}>
        <div className="message-input-wrapper">
          <div className="text-area-container">
            <div className="text-input-wrapper">
              <input
                className="text-area-input"
                type="text"
                value={this.state.body}
                onChange={this.handleChange("body")}
                placeholder={`Message @${this.props.channelTitle}`}
              />
              <input
                className="text-submit-button"
                type="submit"
                value="Submit"
              />
            </div>
            {alert}
          </div>
        </div>
      </form>
    );
  }
}

export default DirectMessageInput;
