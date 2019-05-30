import { connect } from "react-redux";
import { fetchAllServers, fetchServer } from "../../actions/server_actions";
import { logoutUser } from "../../actions/session_actions";
import { withRouter, Link } from "react-router-dom";
import ServerIndex from "./server_index";

const msp = ({ entities, session }) => ({
  currentUser: session.currentUser,
  servers: Object.values(entities.servers)
});

const mdp = dispatch => ({
  fetchAllServers: userId => dispatch(fetchAllServers(userId)),
  fetchServer: id => dispatch(fetchServer(id)),
  logoutUser: () => dispatch(logoutUser())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(ServerIndex)
);
