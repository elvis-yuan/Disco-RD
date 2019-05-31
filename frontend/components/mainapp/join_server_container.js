import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeModal } from "../../actions/modal_actions";
import JoinServerModal from "./join_server_modal";
import { joinServer } from "../../actions/server_actions";

const msp = ({ errors }) => ({
  errors: errors.server,
  formType: "create"
});

const mdp = dispatch => ({
  joinServer: server => dispatch(joinServer(server)),
  mainModal: () => dispatch(openModal("main")),
  closeModal: () => dispatch(closeModal())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(JoinServerModal)
);
