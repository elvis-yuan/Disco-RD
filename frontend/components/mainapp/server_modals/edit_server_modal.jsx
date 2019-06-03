import React from "react";
import { deleteErrors } from "../../../actions/session_actions";
import { closeModal, openModal } from "../../../actions/modal_actions";

class EditServerModal extends React.Component {
  constructor(props) {
    super(props);
    this.currentServer = parseInt(
      this.props.history.location.pathname.split("/")[2]
    );
    this.currentTitle = this.props.servers[this.currentServer].title;
    this.state = {
      title: this.currentTitle,
      id: this.currentServer
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    dispatch(deleteErrors());
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateServer(this.state).then(() => dispatch(closeModal()));
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  render() {
    const { errors } = this.props;
    const errorText =
      errors.length > 0 ? (
        <span className="server-create-error">- This field is required</span>
      ) : null;

    const redText = errors.length > 0 ? "red-text" : "";

    return (
      <div className="edit-server-modal-wrapper">
        <form className="edit-server-modal-form" onSubmit={this.handleSubmit}>
          <div className="edit-server-header">
            <div className="edit-server-wrapper">
              <h4 className="edit-server-h4">Edit {this.currentTitle}</h4>
              <p className="edit-server-subtitle" />
            </div>
          </div>
          <div className="edit-server-input-wrapper">
            <label className={`edit-server-label ${redText}`}>
              SERVER NAME {errorText}
            </label>
            <input
              className="edit-server-input"
              type="text"
              value={this.state.title}
              onChange={this.handleChange("title")}
            />
          </div>
          <div className="edit-server-button-wrapper">
            <span
              className="edit-server-delete-button"
              onClick={() => dispatch(openModal("deleteServer"))}
            >
              Delete Server
            </span>
            <div className="edit-server-buttons">
              <span
                className="edit-server-cancel"
                onClick={() => dispatch(closeModal())}
              >
                Cancel
              </span>
              <input
                className="edit-server-button"
                type="submit"
                value="Edit Server"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditServerModal;
