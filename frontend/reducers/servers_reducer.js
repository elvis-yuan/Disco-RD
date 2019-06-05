import merge from "lodash/merge";
import {
  RECEIVE_ALL_SERVERS,
  RECEIVE_SERVER,
  REMOVE_SERVER,
  LEAVE_SERVER,
  updateServer
} from "../actions/server_actions";
import {
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL,
  CHANNEL_APPEARED,
  CHANNEL_DISAPPEARED
} from "../actions/channel_actions";

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
      // case LEAVE_SERVER:
      return action.servers;
    case CHANNEL_APPEARED:
      let { id, server_id } = action.channel;
      let updatedServer = state[server_id];
      if (!updatedServer.channel_ids.includes(id)) {
        updatedServer.channel_ids.push(id);
      }
      return merge({}, state);
    case CHANNEL_DISAPPEARED:
      // let { id, server_id } = action.channel;
      // let updatedServer = state[server_id];
      // updatedServer.channel_ids = updateServer.channel_ids.filter(
      //   id => id !== action.channel.id
      // );
      let updatedState = merge({}, state);
      updatedState[action.channel.server_id].channel_ids;
      // updated[updatedServer.id]

      debugger;
      return merge({}, state);
    case RECEIVE_CHANNEL:
    case REMOVE_CHANNEL:
      const newState = merge({}, state);
      delete newState[action.channel.server.id];
      return merge({}, newState, {
        [action.channel.server.id]: action.channel.server
      });
    default:
      return state;
  }
};

export default serverReducer;
