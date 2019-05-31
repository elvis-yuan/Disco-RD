import React from "react";
import ServerIndexContainer from "./server_index_container";
import { Route, Switch } from "react-router-dom";
import ChannelIndex from "./channel_index";
import { ServerRoute, CustomRoute } from "../../util/route_util";
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
    fetchAllServers(currentUser);
  }

  render() {
    const servercomp =
      this.props.servers.length === 0 ? null : (
        <ServerRoute path="/:serverId" component={ChannelIndex} />
      );

    return this.props.location.pathname === "/servers" ? (
      <div className="main-app">
        <ServerIndexContainer />
        {/* // <Route path="/:serverId/:channelId" component={ChannelIndex} /> */}
      </div>
    ) : (
      <div className="main-app">
        <ServerIndexContainer />
        {servercomp}
        {/* // <Route path="/:serverId/:channelId" component={ChannelIndex} /> */}
      </div>
    );
  }
}

export default connect(
  msp,
  mdp
)(Main);
