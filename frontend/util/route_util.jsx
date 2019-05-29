import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ChannelIndex from "../components/mainapp/channel_index";

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      !loggedIn ? <Component {...props} /> : <Redirect to="/servers" />
    }
  />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      loggedIn ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const Custom = props => {
  return (
    <Route
      {...props}
      Component={props => {
        if (props.match.params.serverId) return ChannelIndex;
        else this.props.histor.push("/servers");
      }}
    />
  );
};

const Server = ({ component: Component, path, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      loggedIn ? <Component {...props} /> : <Redirect to="/servers" />
    }
  />
);

const msp = (state, ownProps) => {
  // debugger;
  return {
    connectedServer: Object.values(state.servers).includes(
      ownProps.match.params.serverId
    )
  };
};

const mapStateToProps = state => {
  // debugger;
  return {
    loggedIn: Boolean(state.session.currentUser)
  };
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const ServerRoute = withRouter(connect(msp)(Server));
export const CustomRoute = withRouter(connect(msp)(Custom));
