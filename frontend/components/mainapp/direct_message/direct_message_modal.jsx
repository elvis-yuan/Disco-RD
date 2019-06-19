import React from "react";

class DirectMessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      server_id: this.props.server_id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username.split(" ") !== "") {
      this.props.createDm(this.state).then(this.props.closeModal);
    }
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }
  render() {
    const { errors } = this.props;

    const errorText = errors.includes("yourself") ? (
      <span className="server-create-error">
        - Cannot direct message yourself
      </span>
    ) : null;

    const noUser = errors.includes("no user") ? (
      <span className="server-create-error">- User does not exist</span>
    ) : null;

    const alreadyExist = errors.includes("already exists") ? (
      <span className="server-create-error">
        - Direct message already exists
      </span>
    ) : null;

    const redText = errors.length > 0 ? "red-text" : "";
    return (
      <div className="create-channel-modal-wrapper">
        <form
          className="create-channel-modal-form"
          onSubmit={this.handleSubmit}
        >
          <div className="create-channel-header">
            <div className="create-channel-wrapper">
              <h4 className="create-channel-h4">Create a Direct Message</h4>
              <p className="create-channel-subtitle" />
            </div>
          </div>
          <div className="create-channel-input-wrapper">
            <label className={`create-channel-label ${redText}`}>
              USERNAME {errorText} {noUser} {alreadyExist}
            </label>
            <input
              className="create-channel-input"
              type="text"
              value={this.state.username}
              onChange={this.handleChange("username")}
            />
          </div>
          <div className="create-channel-button-wrapper">
            <span
              className="create-channel-cancel"
              onClick={this.props.closeModal}
            >
              Cancel
            </span>
            <input
              className="create-channel-button"
              type="submit"
              value="Create Direct Message"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default DirectMessageModal;
