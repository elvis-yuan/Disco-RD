import merge from "lodash/merge";
import { RECEIVE_ALL_SERVERS, RECEIVE_SERVER } from "../actions/server_actions";

const serverReducer = (state = {}, action) => {
  Object.freeze(state);
  // debugger;
  switch (action.type) {
    case RECEIVE_ALL_SERVERS:
      return action.servers;
    case RECEIVE_SERVER:
      const { server } = action.server;
      const newServer = { [server.id]: server };
      return merge({}, state, newServer);
    default:
      return state;
  }
};

export default serverReducer;
