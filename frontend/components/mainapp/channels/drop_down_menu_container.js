import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { openModal } from "../../../actions/modal_actions";
import DropDownMenu from "./drop_down_menu";

const mdp = dispatch => ({
  editServer: () => dispatch(openModal("editServer")),
  leaveServer: () => dispatch(openModal("leaveServer")),
  inviteServer: () => dispatch(openModal("inviteToServer"))
});

export default withRouter(
  connect(
    null,
    mdp
  )(DropDownMenu)
);
