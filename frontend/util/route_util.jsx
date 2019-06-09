import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      !loggedIn ? <Component {...props} /> : <Redirect to="/servers/@me" />
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

const Server = ({
  component: Component,
  path,
  exact,
  connectedServer,
  history
}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props =>
        connectedServer ? <Component {...props} /> : history.push("/servers/@me")
      }
    />
  );
};

const msp = (state, ownProps) => {
  const empty = ownProps.location.pathname.slice(9) === "";
  const path = parseInt(ownProps.location.pathname.slice(9));
  return {
    connectedServer:
      Object.values(state.entities.servers)
        .map(server => server.id)
        .includes(path) || empty
  };
};

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser)
  };
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const ServerRoute = withRouter(connect(msp)(Server));
