import { connect } from "react-redux";
import { closeModal, openModal } from "../../../actions/modal_actions";
import InviteModal from "./invite_modal";
import { withRouter } from "react-router-dom";

const msp = state => ({
  servers: state.entities.servers
});

const mdp = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export default withRouter(
  connect(
    msp,
    mdp
  )(InviteModal)
);
