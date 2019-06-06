import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Channel = ({
  component: Component,
  path,
  exact,
  connectedServer,
  connectedChannel,
  serverId,
  history
}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props =>
        connectedServer && connectedChannel ? (
          <Component {...props} />
        ) : (
          history.push(`/servers/${serverId}`)
        )
      }
    />
  );
};

const msp = (state, ownProps) => {
  const empty = ownProps.location.pathname.slice(9) === "";
  const serverId = parseInt(ownProps.location.pathname.slice(9));
  const emptyCh = ownProps.location.pathname.split("/")[3] === undefined;
  const channelId = parseInt(ownProps.location.pathname.split("/")[3]);

  return {
    connectedServer:
      Object.values(state.entities.servers)
        .map(server => server.id)
        .includes(serverId) || empty,

    serverId: serverId,
    channelId: channelId,

    connectedChannel: state.entities.servers[serverId]
      ? state.entities.servers[serverId].channel_ids.includes(channelId) ||
        emptyCh
      : false
  };
};

export const ChannelRoute = withRouter(connect(msp)(Channel));
