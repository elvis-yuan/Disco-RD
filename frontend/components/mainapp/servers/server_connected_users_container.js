import { connect } from "react-redux";
import ServerConnectedUsers from "./server_connected_users";
import { withRouter } from "react-router-dom";

const msp = (state, ownProps) => ({
  users: state.entities.users,
  server: state.entities.servers[ownProps.match.params.serverId]
});

export default withRouter(
  connect(
    msp,
    null
  )(ServerConnectedUsers)
);
