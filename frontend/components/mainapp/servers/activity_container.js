import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Activity from "./activity";

const msp = ({ entities, session }) => {
  return {
    channels: entities.channels,
    currentUser: entities.users[session.currentUser],
    currentUserId: session.currentUser,
    servers: entities.servers
  };
};


export default withRouter(
  connect(
    msp,
    null
  )(Activity)
);
