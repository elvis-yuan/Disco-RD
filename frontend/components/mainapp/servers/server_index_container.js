import { connect } from "react-redux";
import { fetchAllServers, fetchServer } from "../../../actions/server_actions";
import { logoutUser } from "../../../actions/session_actions";
import { withRouter, Link } from "react-router-dom";
import ServerIndex from "./server_index";
import { openModal } from "../../../actions/modal_actions";

const msp = ({ entities, session, ui }) => {
  return {
    currentUser: session.currentUser,
    servers: entities.servers,
    modalOpen: ui.modal ? ["join", "main", "create"].includes(ui.modal) : false
  };
};

const mdp = dispatch => ({
  fetchAllServers: userId => dispatch(fetchAllServers(userId)),
  fetchServer: id => dispatch(fetchServer(id)),
  logoutUser: () => dispatch(logoutUser()),
  mainModal: () => dispatch(openModal("main")),
  logoutModal: () => dispatch(openModal("logoutUser"))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(ServerIndex)
);
