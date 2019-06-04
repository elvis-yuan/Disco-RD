import React from "react";
import { deleteErrors } from "../../../actions/session_actions";
import { closeModal, openModal } from "../../../actions/modal_actions";

class EditChannel extends React.Component {
  constructor(props) {
    super(props);
    this.currentTitle = this.props.channels[this.props.currentChannel].title;

    this.state = {
      title: this.currentTitle,
      id: this.props.currentChannel
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateChannel(this.state).then(this.props.closeModal);
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
              CHANNEL NAME {errorText}
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
              onClick={this.props.deleteChannel}
            >
              Delete Channel
            </span>
            <div className="edit-server-buttons">
              <span
                className="edit-server-cancel"
                onClick={this.props.closeModal}
              >
                Cancel
              </span>
              <input
                className="edit-server-button"
                type="submit"
                value="Edit Channel"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditChannel;
