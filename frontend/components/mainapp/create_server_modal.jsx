import React from "react";
import { openModal, closeModal } from "../../actions/modal_actions";

class CreateServerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      icon_url: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createServer(this.state).then(server => {
      this.props.closeModal();
      this.props.history.push(`/servers/${server.id}`);
    });
  }

  render() {
    const errors = this.props.errors;

    return (
      <div className="server-modal-form no-padding">
        <div className="server-create-animation">
          <div className="create-animation">
            <form action="create-form" onSubmit={this.handleSubmit}>
              <div className="create-form-container">
                <h1 className="create-form-header">Create Your Server</h1>
                <p>
                  By creating a server, you will have access to{" "}
                  <strong>free</strong> voice and text chat to use amongst your
                  friends.
                </p>
                <div className="server-inputs">
                  <div className="server-information">
                    <label>Server Name</label>
                    <input
                      placeholder="Enter a server name"
                      type="text"
                      onChange={this.handleChange("title")}
                      value={this.state.title}
                    />
                  </div>
                  <div className="server-icon-selector">placeholder</div>
                </div>
              </div>
              <div className="create-server-btn-container">
                <input type="submit" value="Create" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateServerModal;
