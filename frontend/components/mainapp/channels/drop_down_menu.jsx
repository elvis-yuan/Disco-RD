import React from "react";
import { openModal } from "../../../actions/modal_actions";

class DropDownMenu extends React.Component {
  componentDidUpdate() {
    this.props.closeDropDown();
  }

  render() {
    const { currentServer, handleOpenModal, currentUser } = this.props;

    const correctButton =
      this.props.currentServer.admin_id === currentUser.id ? (
        <div className="px-margin-wrapper">
          <div
            className="edit-server-button"
            onClick={() => dispatch(openModal("editServer"))}
          >
            {" "}
            Edit Server{" "}
          </div>
        </div>
      ) : (
        <div className="px-margin-wrapper">
          <div
            className="edit-server-button"
            onClick={() => dispatch(openModal("leaveServer"))}
          >
            {" "}
            Leave Server{" "}
          </div>
        </div>
      );

    return (
      <div className="drop-down-menu-wrapper">
        <div className="drop-down-menu">
          <h1>Server Invitation Code</h1>
          <input
            type="text"
            className="invitation-code"
            value={currentServer.invitation_code}
            disabled
          />
          {correctButton}
          {/* <div className="px-margin-wrapper">
            <div
              className="edit-server-button"
              onClick={() => dispatch(openModal("editServer"))}
            >
              {" "}
              Edit Server{" "}
            </div>
          </div> */}

          {/* <div
            className="delete-server-button-wrapper"
            onClick={this.deleteServer}
          >
            <span className="delete-server-button">Delete Server</span>
          </div> */}
        </div>
      </div>
    );
  }
}

export default DropDownMenu;
