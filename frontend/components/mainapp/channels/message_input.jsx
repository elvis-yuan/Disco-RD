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
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.body}
          onChange={this.handleChange("body")}
          placeholder="type here"
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default MessageInput;
