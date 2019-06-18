import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { currentDm } from "../../../actions/modal_actions";
import Activity from "./activity";
import { fetchDm } from "../../../actions/server_actions";
import { openModal } from "../../../actions/modal_actions";

const msp = ({ entities, session }) => {
  return {
    channels: entities.channels,
    currentUser: entities.users[session.currentUser],
    currentUserId: session.currentUser,
    users: entities.users,
    servers: entities.servers,
    dmChannels: entities.directmessages.channel_ids,
    dmIds: entities.directmessages.dm_ids
  };
};

const mdp = dispatch => {
  return {
    createDm: dm => dispatch(createDm(dm)),
    fetchDm: () => dispatch(fetchDm()),
    currentDm: username => dispatch(currentDm(username)),
    openModal: () => dispatch(openModal("createDM"))
  };
};

export default withRouter(
  connect(
    msp,
    mdp
  )(Activity)
);
