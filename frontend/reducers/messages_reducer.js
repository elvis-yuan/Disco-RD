import { RECEIVE_CHANNEL } from "../actions/channel_actions";
import { RECEIVE_MESSAGES } from "../actions/message_actions";
import { merge } from "lodash";

const messageReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNEL:
      return merge({}, state, action.channel.messages);
    case RECEIVE_MESSAGES:
      return merge({}, state, action.payload.messages);
    default:
      return state;
  }
};

export default messageReducer;
