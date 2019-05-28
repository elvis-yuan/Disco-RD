import React from "react";
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import Formpage from "./components/session/formpage";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import Main from "./components/mainapp/main";

const App = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Route exact path="/" component={Homepage} />
      <AuthRoute path="/login" component={Formpage} />
      <AuthRoute path="/signup" component={Formpage} />
      <ProtectedRoute path="/servers" component={Main} />
    </HashRouter>
  </Provider>
);

export default App;
