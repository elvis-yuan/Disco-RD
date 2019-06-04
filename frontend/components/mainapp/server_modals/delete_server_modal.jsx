import React from "react";

import { closeModal } from "../../../actions/modal_actions";

class DeleteServerModal extends React.Component {
  constructor(props) {
    super(props);
    this.currentServer = parseInt(
      this.props.history.location.pathname.split("/")[2]
    );
    this.currentTitle = this.props.servers[this.currentServer].title;
    this.state = {
      title: "",
      id: this.currentServer,
      errors: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    if (this.props.errors.length > 0) {
      this.props.deleteErrors();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.title === this.currentTitle) {
      this.props.history.push("/servers");
      this.props.deleteServer(this.currentServer).then(this.props.closeModal);
    } else {
      this.setState({ errors: true });
    }
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }
  render() {
    const errors = this.state.errors;
    const errorText = errors ? (
      <span className="server-create-error">- Incorrect Server Name</span>
    ) : null;

    const redText = errors ? "red-text" : "";
    //debugger;
    return (
      <div className="delete-server-modal-wrapper">
        <form className="delete-server-modal-form" onSubmit={this.handleSubmit}>
          <div className="delete-server-header">
            <div className="delete-server-wrapper">
              <h4 className="delete-server-h4">delete '{this.currentTitle}'</h4>
              <p className="delete-server-subtitle" />
            </div>
          </div>
          <div className="delete-server-warning-wrapper">
            <div className="delete-server-warning">
              <div className="delete-server-warning-text">
                Are you sure you want to delete{" "}
                <strong>{this.currentTitle}</strong>? This action cannot be
                undone.
              </div>
            </div>
          </div>
          <div className="delete-server-input-wrapper">
            <label className={`delete-server-label ${redText}`}>
              ENTER SERVER NAME {errorText}
            </label>
            <input
              className="delete-server-input"
              type="text"
              value={this.state.title}
              onChange={this.handleChange("title")}
            />
          </div>
          <div className="edit-server-button-wrapper">
            <span />
            <div className="edit-server-buttons">
              <span
                className="edit-server-cancel"
                onClick={this.props.closeModal}
              >
                Cancel
              </span>
              <input
                className="delete-server-button"
                type="submit"
                value="Delete Server"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default DeleteServerModal;
