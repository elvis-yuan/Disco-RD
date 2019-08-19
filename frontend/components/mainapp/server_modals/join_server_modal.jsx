import React from "react";

class JoinServerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { invitation_code: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillUnmount() {
    if (this.props.errors.length > 0) this.props.removeErrors();
  }

  handleCloseModal(action) {
    this.props.closeModal();
    this.props.history.push(`/servers/${action.server.server.id}`);
  }
  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
      if (this.props.errors.length > 0) this.props.removeErrors();
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.joinServer(this.state).then(this.handleCloseModal);

  }

  render() {
    const { errors } = this.props;

    const serverError = errors.length > 0 ? "red-text" : "";

    const inviteError =
      errors.includes("empty") || errors.includes("no server found") ? (
        <span className="red-text">(The instant invite is invalid)</span>
      ) : (
        ""
      );

    const alreadyJoined = errors.includes("already joined the server") ? (
      <span className="red-text">(You are already in this server)</span>
    ) : (
      ""
    );

    return (
      <div className="server-modal-form no-padding">
        <div className="server-create-animation">
          <div className="create-animation">
            <form className="create-form" onSubmit={this.handleSubmit}>
              <div className="join-form-container">
                <h1 className="green-text create-form-header ">
                  Join a server
                </h1>
                <div className="join-instructions">
                  <p className="description">
                    Enter an Instant Invite below to join an existing server.
                    The invite will look something like this:
                  </p>
                  <h3 className="blue-text">qjq5C4zj</h3>
                </div>
                <div className="join-input-container">
                  <input
                    type="text"
                    value={this.state.invitation_code}
                    onChange={this.handleChange("invitation_code")}
                    className={`join-server-input ${serverError}`}
                  />
                  <label>
                    Enter an Instant Invite {inviteError}
                    {alreadyJoined}
                  </label>
                </div>
              </div>
              <div className="create-server-btn-container">
                <div
                  className="form-back-button"
                  onClick={this.props.mainModal}
                >
                  <div />
                  <p>Back</p>
                </div>
                <input className="server-join-btn" type="submit" value="Join" />
              </div>
            </form>
          </div>
        </div>
        //{" "}
      </div>
    );
  }
}

export default JoinServerModal;
