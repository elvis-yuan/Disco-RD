import * as ChannelAPI from "../util/channel_api_util";
import { RECEIVE_ERRORS } from "./session_actions";

export const RECEIVE_ALL_CHANNELS = "RECEIEVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export const CHANNEL_APPEARED = "CHANNEL_APPEARED";
export const CHANNEL_DISAPPEARED = "CHANNEL_DISAPPEARED";

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

export const channelAppeared = channel => ({
  type: CHANNEL_APPEARED,
  channel
});

export const channelDisappeared = channel => ({
  type: CHANNEL_DISAPPEARED,
  channel
});

export const removeChannel = channel => ({
  type: REMOVE_CHANNEL,
  channel
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

export const updateChannel = channel => dispatch =>
  ChannelAPI.updateChannel(channel).then(
    channel => dispatch(receiveChannel(channel)),
    errors => dispatch(receiveErrors(errors))
  );

export const deleteChannel = channelId => dispatch =>
  ChannelAPI.deleteChannel(channelId).then(
    action => dispatch(removeChannel(action)),
    errors => dispatch(receiveErrors(errors))
  );
