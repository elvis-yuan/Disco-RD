import React from "react";
import { closeModal } from "../../../actions/modal_actions";

class LogoutModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
    this.props.closeModal;
  }

  render() {
    return (
      <div className="edit-server-modal-wrapper">
        <form className="edit-server-modal-form">
          <div className="edit-server-header">
            <div className="edit-server-wrapper">
              <h4 className="edit-server-h4">LOGOUT</h4>
              <p className="edit-server-subtitle" />
            </div>
          </div>
          <div className="edit-server-input-wrapper">
            <label className="logout-confirm-text">
              Are you sure you want to logout?
            </label>
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
                onClick={this.handleSubmit}
                className="delete-server-button"
                type="submit"
                value="Log Out"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LogoutModal;
