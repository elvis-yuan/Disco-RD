import { merge } from "lodash";
import {
  RECEIVE_ALL_SERVERS,
  RECEIVE_SERVER,
  REMOVE_SERVER,
  LEAVE_SERVER,
  updateServer
} from "../actions/server_actions";

import { LOGOUT } from "../actions/session_actions";

import {
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL,
  CHANNEL_APPEARED,
  CHANNEL_DISAPPEARED
} from "../actions/channel_actions";
import {
  RECEIVE_USER,
  RECEIVE_DATA,
  REMOVE_DATA
} from "../actions/user_actions";

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
    case LEAVE_SERVER:
      return action.servers;
    case CHANNEL_APPEARED:
      const channelAppeared = merge({}, state);

      if (
        !channelAppeared[action.channel.server_id].channel_ids.includes(
          action.channel.id
        )
      ) {
        channelAppeared[action.channel.server_id].channel_ids.push(
          action.channel.id
        );
      }
      return channelAppeared;
    // case LOGOUT:
    //   debugger;
    //   return {};
    case CHANNEL_DISAPPEARED:
      const channelDisappeared = merge({}, state);
      const index = channelDisappeared[
        action.channel.server_id
      ].channel_ids.indexOf(action.channel.id);
      if (index !== -1) {
        channelDisappeared[action.channel.server_id].channel_ids.splice(
          index,
          1
        );
      }
      return channelDisappeared;
    case RECEIVE_CHANNEL:
    case REMOVE_CHANNEL:
      const newState = merge({}, state);
      delete newState[action.channel.server.id];
      return merge({}, newState, {
        [action.channel.server.id]: action.channel.server
      });
    case RECEIVE_DATA:
      const connectedUser = merge({}, state);
      if (
        !connectedUser[action.data.server_id].connected_user_ids.includes(
          action.data.user.id
        )
      ) {
        connectedUser[action.data.server_id].connected_user_ids.push(
          action.data.user.id
        );
      }
      return connectedUser;
    case REMOVE_DATA:
      const disconnectedUser = merge({}, state);
      const userIndex = disconnectedUser[
        action.data.server_id
      ].connected_user_ids.indexOf(action.data.user.id);
      disconnectedUser[action.data.server_id].connected_user_ids.splice(
        userIndex,
        1
      );
      return disconnectedUser;
    default:
      return state;
  }
};

export default serverReducer;
