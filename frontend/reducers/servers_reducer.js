import { merge } from "lodash";
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
      const channelAppeared = merge({}, state);
      if (!channelAppeared.channel_ids.includes(id)) {
        updatedServer.channel_ids.push(id);
      }
      return channelAppeared;
    case CHANNEL_DISAPPEARED:
      const channelDisappeared = merge({}, state);
      const index = channelDisappeared[
        action.channel.server_id
      ].channel_ids.indexOf(action.channel.id);
      channelDisappeared[action.channel.server_id].channel_ids.splice(index, 1);
      return channelDisappeared;
    case RECEIVE_CHANNEL:
    case REMOVE_CHANNEL:
      const newState = merge({}, state);
      delete newState[action.channel.server.id];
      debugger;
      return merge({}, newState, {
        [action.channel.server.id]: action.channel.server
      });
    default:
      return state;
  }
};

export default serverReducer;
