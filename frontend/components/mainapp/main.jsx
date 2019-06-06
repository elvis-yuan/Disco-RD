import React from "react";
import ServerIndexContainer from "./servers/server_index_container";
import { Route, Switch } from "react-router-dom";
import ChannelIndexContainer from "./channels/channel_index_container";
import { ServerRoute, CustomRoute } from "../../util/route_util";
import { connect } from "react-redux";
import { fetchAllServers, fetchServer } from "../../actions/server_actions";
import ChannelChatContainer from "./channels/channel_chat_container";
import { ChannelRoute } from "../../util/channel_route_util";
import ServerOnlineContainer from "./servers/activity_container";

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
    App.server = {};
    App.channel = {};
  }

  render() {
    const servercomp =
      this.props.servers.length === 0 ? null : (
        <ServerRoute
          path="/servers/:serverId"
          component={ChannelIndexContainer}
        />
      );

    return this.props.location.pathname === "/servers" ? (
      <div className="main-app">
        <ServerIndexContainer />
        {/* // <Route path="/:serverId/:channelId" component={ChannelIndex} /> */}
        <ServerOnlineContainer />
        <div className="wompus-wrapper">
          <div className="wompus-container">
            <div className="wompus-image" />
            <div className='wompus-text'>
              Welcome To Disco-RD. This is a clone of Discord. Enjoy your stay!
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="main-app">
        <ServerIndexContainer />
        {servercomp}
        <ChannelRoute
          exact
          path="/servers/:serverId/:channelId"
          component={ChannelChatContainer}
        />
      </div>
    );
  }
}

export default connect(
  msp,
  mdp
)(Main);
