import React from "react";
import ServerIndexContainer from "./server_index_container";
import { Route } from "react-router-dom";
import ChannelIndex from "./channel_index";
import { ServerRoute } from "../../util/route_util";
import { connect } from "react-redux";
import { fetchAllServers, fetchServer } from "../../actions/server_actions";

const msp = ({ entities, session }) => ({
  currentUser: session.currentUser,
  servers: Object.values(entities.servers)
});

const mdp = dispatch => ({
  fetchAllServers: userId => dispatch(fetchAllServers(userId))
});

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { currentUser, fetchAllServers } = this.props;
    fetchAllServers(currentUser.id);
  }

  render() {
    // debugger;
    const servercomp =
      this.props.servers.length === 0 ? null : (
        <Route path="/:serverId" component={ChannelIndex} />
      );
    return (
      <div className="main-app">
        <ServerIndexContainer />
        {servercomp}
        {/* <ServerRoute path="/:serverId" component={ChannelIndex} /> */}
        {/* // <Route path="/:serverId/:channelId" component={ChannelIndex} /> */}
      </div>
    );
  }
}

export default connect(
  msp,
  mdp
)(Main);
