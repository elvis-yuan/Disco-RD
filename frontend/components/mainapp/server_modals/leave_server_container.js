import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { leaveServer } from "../../../actions/server_actions";
import { deleteErrors } from "../../../actions/session_actions";
import { closeModal } from "../../../actions/modal_actions";
import LeaveServerModal from "./leave_server_modal";

const msp = state => {
  debugger;
  return {
    servers: state.entities.servers
  };
};

const mdp = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  leaveServer: serverId => dispatch(leaveServer(serverId))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(LeaveServerModal)
);
