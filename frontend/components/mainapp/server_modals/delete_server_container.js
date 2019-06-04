import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DeleteServerModal from "./delete_server_modal";
import { deleteServer } from "../../../actions/server_actions";
import { deleteErrors } from "../../../actions/session_actions";
import { closeModal } from "../../../actions/modal_actions";

const msp = state => ({
  errors: state.errors.server,
  servers: state.entities.servers
});

const mdp = dispatch => ({
  deleteServer: serverId => dispatch(deleteServer(serverId)),
  deleteErrors: () => dispatch(deleteErrors()),
  closeModal: () => dispatch(closeModal())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(DeleteServerModal)
);
