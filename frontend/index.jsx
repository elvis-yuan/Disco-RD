import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import configureStore from "./store/store";
import { fetchAllServers } from "./actions/server_actions";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store = configureStore();

  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.store = store.getState();
  window.dispatch = store.dispatch;
  window.fetchAllServers = fetchAllServers;

  ReactDOM.render(<App store={store} />, root);
});