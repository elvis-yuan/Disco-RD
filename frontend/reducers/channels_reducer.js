import merge from "lodash/merge";
import {
  RECEIVE_CHANNEL,
  RECEIVE_ALL_CHANNELS,
  REMOVE_CHANNEL
} from "../actions/channel_actions";
import { RECEIVE_SERVER, REMOVE_SERVER } from "../actions/server_actions";

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_CHANNELS:
      return action.channels;
    case RECEIVE_CHANNEL:
      const { channel } = action.channel;
      return merge({}, state, { [channel.id]: channel });
    case RECEIVE_SERVER:
      const { channels } = action.server;
      return merge({}, state, channels);
    case REMOVE_SERVER:
      const removeChannels = merge({}, state);
      // action.server.channels.each(channel => delete removeChannels[channel.id]);
      return removeChannels;
    case REMOVE_CHANNEL:
      const newState = merge({}, state);
      delete newState[action.channel.channel.id];
      return newState;
    default:
      return state;
  }
};

export default channelsReducer;
