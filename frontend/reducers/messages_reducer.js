import { RECEIVE_CHANNEL } from "../actions/channel_actions";
import { merge } from "lodash";

const messageReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNEL:
      const newState = merge({}, state);
      return merge({}, state, action.channel.messages);
    default:
      return state;
  }
};

export default messageReducer;
