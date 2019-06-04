import React from "react";

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      channel_id: parseInt(this.props.history.location.pathname.split("/")[3]),
      user_id: this.props.user_id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    App.cable.subscriptions.subscriptions[0].speak(this.state);
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
                placeholder="type here"
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
