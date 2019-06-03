import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DeleteServerModal from "./delete_server_modal";
import { deleteServer } from "../../../actions/server_actions";

const msp = state => ({
  errors: state.errors.servers
});

const mdp = dispatch => ({
  deleteServer: serverId => dispatch(deleteServer(serverId))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(DeleteServerModal)
);
