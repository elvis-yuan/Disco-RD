import { connect } from "react-redux";
import { fetchAllServers, fetchServer } from "../../actions/server_actions";
import { withRouter, Link } from "react-router-dom";
import ServerIndex from "./server_index";

const msp = ({ entities, session }) => ({
  currentUser: entities.users[session.id],
  servers: Object.values(entities.servers)
});

const mdp = dispatch => ({
  fetchAllServers: userId => dispatch(fetchAllServers(userId)),
  fetchServer: id => dispatch(fetchServer(id))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(ServerIndex)
);
