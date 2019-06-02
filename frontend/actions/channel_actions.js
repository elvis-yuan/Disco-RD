import * as ChannelAPI from "../util/channel_api_util";
import { RECEIVE_ERRORS } from "./session_actions";

export const RECEIVE_ALL_CHANNELS = "RECEIEVE_ALL_CHANNELS";
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

export const createChannel = channel => dispatch =>
  ChannelAPI.createChannel(channel).then(
    channel => dispatch(receiveChannel(channel)),
    errors => dispatch(receiveErrors(errors))
  );

export const deleteChannel = channel => dispatch =>
  ChannelAPI.deleteChannel(channel).then(
    channel => dispatch(receiveChannel(channel)),
    errors => dispatch(receiveErrors(errors))
  );
