import React from "react";

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      channel_id: this.props.match.params.channelId,
      user_id: this.props.user_id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
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
    App[this.props.match.params.channelId].speak(this.state);
    this.setState({ body: "" });
  }

  render() {
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
                placeholder={`Message #${this.props.channelTitle}`}
              />
              <input
                className="text-submit-button"
                type="submit"
                value="Submit"
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default MessageInput;
