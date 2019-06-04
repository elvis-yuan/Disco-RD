import { connect } from "react-redux";
import MessageFormat from "./message_format";

const msp = state => ({
  users: state.entities.users
});

const mdp = dispatch => ({});

export default connect(
  msp,
  mdp
)(MessageFormat);
