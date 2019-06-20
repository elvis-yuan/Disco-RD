import { RECEIVE_DM } from "../actions/server_actions";
import { RECEIVE_DIRECTMESSAGE, NEW_DM } from "../actions/directmessage_action";
import { merge } from "lodash";

const directMessageReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_DM:
      return action.server.server;
    case RECEIVE_DIRECTMESSAGE:
      return action.payload.server;
    case NEW_DM:
      const newState = merge({}, state);
      newState.dm_ids.push(action.payload.channel.id);
      return newState;
    default:
      return state;
  }
};

export default directMessageReducer;
