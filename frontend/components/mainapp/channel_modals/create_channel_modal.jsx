import React from "react";

class CreateChannelModal extends React.Component {
  constructor(props) {
    super(props);
    const currentServer = parseInt(
      this.props.history.location.pathname.split("/")[2]
    );
    this.state = {
      title: "",
      server_id: currentServer
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createChannel(this.state).then(() => {
      this.props.closeModal();
    });
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  render() {
    return (
      <div className="join-channel-modal-wrapper">
        <form className="join-channel-modal-form" onSubmit={this.handleSubmit}>
          form here
          <div>Create Text channel</div>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange("title")}
          />
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

export default CreateChannelModal;
