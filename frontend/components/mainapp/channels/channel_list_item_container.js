import { openModal, editChannel } from "../../../actions/modal_actions";
import { connect } from "react-redux";
import ChannelListItem from "./channel_list_item";
import { withRouter } from "react-router-dom";

const msp = state => ({});

const mdp = dispatch => {
  return {
    editChannel: id => dispatch(editChannel(id)),
    editModal: () => dispatch(openModal("editChannel"))
  };
};

export default withRouter(
  connect(
    msp,
    mdp
  )(ChannelListItem)
);
