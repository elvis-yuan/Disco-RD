import merge from "lodash/merge";
import {
  RECEIVE_CHANNEL,
  RECEIVE_ALL_CHANNELS
} from "../actions/channel_actions";

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_CHANNELS:
      return action.channels;
    case RECEIVE_CHANNEL:
      const { channel } = action;
      return merge({}, state, { [channel.id]: channel });
    default:
      return state;
  }
};

export default channelsReducer;
