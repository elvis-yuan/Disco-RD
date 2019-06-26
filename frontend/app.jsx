import React from "react";
import { Provider } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import Formpage from "./components/session/formpage";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import Main from "./components/mainapp/main";
import Modal from "./components/modal/modal_container";

const App = ({ store }) => (
  <Provider store={store}>
    <div />
    <HashRouter>
      <Modal />
      <Switch>
        <AuthRoute path="/login" component={Formpage} />
        <AuthRoute path="/signup" component={Formpage} />
        <ProtectedRoute path="/servers" component={Main} />
        <Route path="/" component={Homepage} />
      </Switch>
    </HashRouter>
  </Provider>
);

export default App;
