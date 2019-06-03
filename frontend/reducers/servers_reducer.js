import merge from "lodash/merge";
import {
  RECEIVE_ALL_SERVERS,
  RECEIVE_SERVER,
  REMOVE_SERVER,
  LEAVE_SERVER
} from "../actions/server_actions";
import { RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../actions/channel_actions";

const serverReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_SERVERS:
      return action.servers;
    case RECEIVE_SERVER:
      const { server } = action.server;
      const newServer = { [server.id]: server };
      return merge({}, state, newServer);
    case REMOVE_SERVER:
      return action.servers;
    case RECEIVE_CHANNEL:
      // case REMOVE_CHANNEL:
      return merge({}, state, {
        [action.channel.server.id]: action.channel.server
      });
    default:
      return state;
  }
};

export default serverReducer;
