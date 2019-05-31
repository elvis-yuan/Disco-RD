import * as ChannelAPI from "../util/channel_api_util";
import { RECEIVE_ERRORS } from "./session_actions";

export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_SERVERS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";

const receiveAllChannels = channels => ({
  type: RECEIVE_ALL_CHANNELS,
  channels
});

const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const fetchAllChannels = serverId => dispatch =>
  ChannelAPI.fetchAllChannels(serverId).then(channels => {
    dispatch(receiveAllChannels(channels));
  });

export const fetchChannel = id => dispatch =>
  ChannelAPI.fetchChannel(id).then(channel =>
    dispatch(receiveChannel(channel))
  );

export const createChanne = channel => dispatch =>
  ChannelAPI.createChannel(channel).then(channel =>
    dispatch(receiveChannel(channel))
  );
