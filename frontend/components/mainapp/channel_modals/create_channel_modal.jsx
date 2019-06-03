import React from "react";
import { openModal, closeModal } from "../../../actions/modal_actions";
import { deleteErrors } from "../../../actions/session_actions";

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

  componentWillUnmount() {
    dispatch(deleteErrors());
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
    const title = this.props.servers[this.state.server_id].title;
    const { errors } = this.props;
    const errorText =
      errors.length > 0 ? (
        <span className="server-create-error">- This field is required</span>
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
              <h4 className="create-channel-h4">Create Text channel</h4>
              <p className="create-channel-subtitle">in {title}</p>
            </div>
          </div>
          <div className="create-channel-input-wrapper">
            <label className={`create-channel-label ${redText}`}>
              CHANNEL NAME {errorText}
            </label>
            <input
              className="create-channel-input"
              type="text"
              value={this.state.title}
              onChange={this.handleChange("title")}
            />
          </div>
          <div className="create-channel-button-wrapper">
            <span
              className="create-channel-cancel"
              onClick={() => dispatch(closeModal())}
            >
              Cancel
            </span>
            <input
              className="create-channel-button"
              type="submit"
              value="Create Channel"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateChannelModal;
