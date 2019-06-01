import { connect } from "react-redux";
import ServerFormModal from "./server_form_modal";
import { openModal } from "../../../actions/modal_actions";
import React from "react";

const msp = ({ errors }) => ({
  errors: errors.session,
  formType: "main"
});

const mdp = dispatch => ({
  createForm: (
    <button onClick={() => dispatch(openModal("create"))}>
      Create a server
    </button>
  ),
  joinForm: (
    <button onClick={() => dispatch(openModal("join"))}>Join a server</button>
  ),
  closeModal: () => dispatch(closeModal())
});

export default connect(
  msp,
  mdp
)(ServerFormModal);
