import React from "react";
import ServerIndexContainer from "./servers/server_index_container";
import { Route } from "react-router-dom";
import ChannelIndexContainer from "./channels/channel_index_container";
import { ServerRoute } from "../../util/route_util";
import { connect } from "react-redux";
import { fetchAllServers } from "../../actions/server_actions";
import ChannelChatContainer from "./channels/channel_chat_container";
import { ChannelRoute } from "../../util/channel_route_util";
import ServerOnlineContainer from "./servers/activity_container";
import DirectMessageContainer from "./direct_message/direct_message_container";

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
    App.server = {};
    App.channel = {};
    App.video = {};
  }

  componentDidMount() {
    const { currentUser, fetchAllServers } = this.props;
    fetchAllServers(currentUser);
  }

  render() {
    const servercomp =
      this.props.servers.length === 0 ? null : (
        <ServerRoute
          path="/servers/:serverId"
          component={ChannelIndexContainer}
        />
      );

    return this.props.location.pathname.includes("/servers/@me") ? (
      <div className="main-app">
        <ServerIndexContainer />
        <ServerOnlineContainer />
        {this.props.location.pathname === "/servers/@me" ? (
          <div className="wompus-wrapper">
            <div className="wompus-container">
              <div className="wompus-image" />
              <div className="wompus-text">
                Welcome To Disco-RD. This is a clone of Discord. Enjoy your
                stay!
              </div>
            </div>
          </div>
        ) : (
          <Route
            path="/servers/@me/:channelId"
            component={DirectMessageContainer}
          />
        )}
      </div>
    ) : (
      <div className="main-app">
        <ServerIndexContainer />
        {servercomp}
        {this.props.history.location.pathname.split("/")[3] === undefined ? (
          <div className="no-channel">
            <div className="no-channel-image-wrapper">
              <div className="no-channel-image" />
            </div>
          </div>
        ) : (
          <ChannelRoute
            exact
            path="/servers/:serverId/:channelId"
            component={ChannelChatContainer}
          />
        )}
      </div>
    );
  }
}

export default connect(
  msp,
  mdp
)(Main);
