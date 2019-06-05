import { connect } from "react-redux";
import MessageFormat from "./message_format";

const msp = state => ({
  users: state.entities.users,
  currentUser: state.session.currentUser
});

const mdp = dispatch => ({
  fetchUsers: serverId => dispatch(fetchUsers(serverId))
});

export default connect(
  msp,
  mdp
)(MessageFormat);
