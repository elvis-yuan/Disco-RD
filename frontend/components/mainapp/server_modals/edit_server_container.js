import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditServerModal from "./edit_server_modal";
import { updateServer } from "../../../actions/server_actions";

const msp = state => ({
  servers: state.entities.servers,
  errors: state.errors.server
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
