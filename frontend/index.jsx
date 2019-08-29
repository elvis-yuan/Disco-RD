import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import configureStore from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;

  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: {
        currentUser: window.currentUser.id
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
    window.location.href = "/#/servers/@me";
  } else {
    store = configureStore();
  }

  ReactDOM.render(<App store={store} />, root);
});
