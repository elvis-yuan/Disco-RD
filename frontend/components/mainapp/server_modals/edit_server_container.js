import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditServerModal from "./edit_server_modal";
import { updateServer } from "../../../actions/server_actions";
import { openModal, closeModal } from "../../../actions/modal_actions";
import { deleteErrors } from "../../../actions/session_actions";

const msp = state => ({
  servers: state.entities.servers,
  errors: state.errors.server
});

const mdp = dispatch => ({
  updateServer: server => dispatch(updateServer(server)),
  deleteServer: () => dispatch(openModal("deleteServer")),
  closeModal: () => dispatch(closeModal()),
  deleteErrors: () => dispatch(deleteErrors())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(EditServerModal)
);
