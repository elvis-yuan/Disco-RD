import { connect } from "react-redux";
import Modal from "./modal";
import { closeModal } from "../../actions/modal_actions";

const msp = ({ ui }) => ({
  modal: ui.modal
});

const mdp = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(
  msp,
  mdp
)(Modal);
