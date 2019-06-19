import { RECEIVE_DM } from "../actions/server_actions";
import { RECEIVE_DIRECTMESSAGE } from "../actions/directmessage_action";
import { merge } from "lodash";

const directMessageReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_DM:
      return action.server.server;
    case RECEIVE_DIRECTMESSAGE:
      return action.payload.server;
    default:
      return state;
  }
};

export default directMessageReducer;
