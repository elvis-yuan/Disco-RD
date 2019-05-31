import React from "react";
import { openModal } from "../../actions/modal_actions";

class JoinServerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { invitation_code: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal(action) {
    this.props.closeModal();
    this.props.history.push(`/servers/${action.server.id}`);
  }
  /*onSubmit={this.handleSubmit}*/
  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.joinServer(this.state).then(this.handleCloseModal);
    // this.props.history.push(`/servers/${server.id}`);
  }

  render() {
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
                  />
                  <label>Enter an Instant Invite</label>
                </div>
              </div>
              <div className="create-server-btn-container">
                <div
                  className="form-back-button"
                  onClick={() => dispatch(openModal("main"))}
                >
                  <div />
                  <p>Back</p>
                </div>
                <input className="server-join-btn" type="submit" value="Join" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default JoinServerModal;
