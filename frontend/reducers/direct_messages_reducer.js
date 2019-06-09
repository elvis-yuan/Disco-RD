import { RECEIVE_DM } from "../actions/server_actions";
import { merge } from "lodash";

const directMessageReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_DM:
      return action.server.server;
    default:
      return state;
  }
};

export default directMessageReducer;
