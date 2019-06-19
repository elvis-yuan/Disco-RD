export const RECEIVE_DIRECTMESSAGE = "RECEIVE_DIRECTMESSAGE";
import * as MessageApi from "../util/message_api_util";

const receiveDM = payload => ({
  type: RECEIVE_DIRECTMESSAGE,
  payload
});

export const createDm = data => dispatch =>
  MessageApi.createDm(data).then(payload => dispatch(receiveDM(payload)));
