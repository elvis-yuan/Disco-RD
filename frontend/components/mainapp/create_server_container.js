import { connect } from "react-redux";
import CreateServerModal from "./create_server_modal";
import { closeModal } from "../../actions/modal_actions";
import { createServer } from "../../actions/server_actions";
import { withRouter } from "react-router-dom";

const msp = ({ errors }) => ({
  errors: errors.server,
  formType: "create"
});

const mdp = dispatch => ({
  createServer: server => dispatch(createServer(server)),
  mainModal: () => dispatch(openModal("main")),
  closeModal: () => dispatch(closeModal())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(CreateServerModal)
);
