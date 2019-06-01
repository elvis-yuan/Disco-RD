import React from "react";
import { openModal } from "../../../actions/modal_actions";

class CreateServerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      icon_url: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal(action) {
    this.props.closeModal();
    this.props.history.push(`/servers/${action.server.id}`);
  }

  componentWillUnmount() {
    if (this.props.errors.length > 0) this.props.removeErrors();
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
      if (this.props.errors.length > 0) this.props.removeErrors();
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createServer(this.state).then(this.handleCloseModal);
    // this.props.history.push(`/servers/${server.id}`);
  }

  render() {
    // debugger;
    const { errors } = this.props;

    const redText = errors.length > 0 ? "red-text" : "";
    const errorText =
      errors.length > 0 ? (
        <span className="server-create-error">- This field is required</span>
      ) : (
        ""
      );

    const { title } = this.state;
    const serverIconLetter = title.length > 0 ? title.slice(0, 1) : "";

    return (
      <div className="server-modal-form no-padding">
        <div className="server-create-animation">
          <div className="create-animation">
            <form action="create-form" onSubmit={this.handleSubmit}>
              <div className="create-form-container">
                <h1 className="create-form-header">Create Your Server</h1>
                <p className="create-form-p">
                  By creating a server, you will have access to{" "}
                  <strong>free</strong> voice and text chat to use amongst your
                  friends.
                </p>
                <div className="server-inputs">
                  <div className="server-information">
                    <label className={`server-information-label ${redText}`}>
                      Server Name {errorText}
                    </label>
                    <input
                      className="server-information-input"
                      placeholder="Enter a server name"
                      type="text"
                      onChange={this.handleChange("title")}
                      value={this.state.title}
                      // autoFocus
                    />
                  </div>
                  <div className="server-icon-selector">
                    <div className="icon-uploader">
                      <div className="server-default-icon">
                        <div className="server-icon-letter">
                          {serverIconLetter}
                        </div>
                      </div>
                    </div>
                    <div className="server-icon-size">Default server icon</div>
                  </div>
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
                <input
                  className="server-create-btn"
                  type="submit"
                  value="Create"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateServerModal;
