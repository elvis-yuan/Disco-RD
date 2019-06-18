export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
import * as MessageApi from "../util/message_api_util";

const receiveMessage = payload => ({
  type: RECEIVE_MESSAGES,
  payload
});

export const fetchMessages = channelId => dispatch =>
  MessageApi.fetchMessages(channelId).then(payload => {
    dispatch(receiveMessage(payload));
  });
