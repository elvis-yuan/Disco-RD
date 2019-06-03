import { connect } from "react-redux";
import LeaveServer from "./leave_server";
import { withRouter } from "react-router-dom";

const msp = state => ({
  servers: state.entities.servers
});

const mdp = dispatch => ({
  leaveServer: serverId => dispatch(leaveServer(serverId))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(LeaveServer)
);
