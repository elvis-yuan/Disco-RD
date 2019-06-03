import React from "react";
import ServerFormContainer from "../mainapp/server_modals/server_form_container";
import CreateServerContainer from "../mainapp/server_modals/create_server_container";
import JoinServerContainer from "../mainapp/server_modals/join_server_container";
import CreateChannelContainer from "../mainapp/channel_modals/create_channel_modal_container";
import EditServerContainer from "../mainapp/server_modals/edit_server_container";
import DeleteServerContainer from "../mainapp/server_modals/delete_server_container";
import LogoutModalContainer from "../mainapp/logout_modal/logout_modal_container";
import EditChannelContainer from "../mainapp/channel_modals/edit_channel_modal_container";
import DeleteChannelContainer from "../mainapp/channel_modals/delete_channel_modal_container";
import LeaveServerContainer from "../mainapp/channels/leave_server_container";

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modal, closeModal } = this.props;
    if (!modal) return null;

    let component;
    switch (modal) {
      case "main":
        component = <ServerFormContainer />;
        break;
      case "create":
        component = <CreateServerContainer />;
        break;
      case "join":
        component = <JoinServerContainer />;
        break;
      case "deleteServer":
        component = <DeleteServerContainer />;
        break;
      case "editServer":
        component = <EditServerContainer />;
        break;
      case "createChannel":
        component = <CreateChannelContainer />;
        break;
      case "logoutUser":
        component = <LogoutModalContainer />;
        break;
      case "editChannel":
        component = <EditChannelContainer />;
        break;
      case "deleteChannel":
        component = <DeleteChannelContainer />;
        break;
      case "leaveServer":
        component = <LeaveServerContainer />;
        break;
      default:
        return null;
    }

    return (
      <div className="modal-background" onClick={closeModal}>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          <div className=" modal-animation ">{component}</div>
        </div>
      </div>
    );
  }
}

export default Modal;
