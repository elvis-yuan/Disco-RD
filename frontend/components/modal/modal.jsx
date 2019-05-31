import React from "react";
import ServerFormContainer from "../mainapp/server_form_container";
import CreateServerContainer from "../mainapp/create_server_container";

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
      // case "join":
      //   component = <JoinServerContainer />;
      //   break;
      default:
        return null;
    }

    return (
      <div className="modal-background" onClick={closeModal}>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          {component}
        </div>
      </div>
    );
  }
}

export default Modal;
