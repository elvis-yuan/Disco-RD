import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditServerModal from "./edit_server_modal";
import { updateServer } from "../../../actions/server_actions";

const msp = store => ({
  servers: store.entities.servers,
  errors: store.errors.server
});

const mdp = dispatch => ({
  updateServer: server => dispatch(updateServer(server))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(EditServerModal)
);
