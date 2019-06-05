import React from "react";

class LeaveSeverModal extends React.Component {
  constructor(props) {
    super(props);
    this.currentServer = parseInt(
      this.props.history.location.pathname.split("/")[2]
    );

    this.currentTitle = this.props.servers[this.currentServer].title;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.closeModal();
    this.props.history.push("/servers");
    this.props.leaveServer(this.props.leaveServer(this.currentServer));
  }

  render() {
    return (
      <div className="delete-server-modal-wrapper">
        <form className="delete-server-modal-form" onSubmit={this.handleSubmit}>
          <div className="delete-server-header">
            <div className="delete-server-wrapper">
              <h4 className="delete-server-h4">Leave '{this.currentTitle}'</h4>
              <p className="delete-server-subtitle" />
            </div>
          </div>
          <div className="delete-server-warning-wrapper">
            <div className="delete-server-warning">
              <div className="delete-server-warning-text">
                Are you sure you want to Leave{" "}
                <strong>{this.currentTitle}</strong>? You will not be able to
                join without being invited
              </div>
            </div>
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
                value="Leave Server"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LeaveSeverModal;
