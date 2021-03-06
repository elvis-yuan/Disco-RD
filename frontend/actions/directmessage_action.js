import * as MessageApi from "../util/message_api_util";
export const RECEIVE_DIRECTMESSAGE = "RECEIVE_DIRECTMESSAGE";
export const DIRECT_MESSAGE_ERROR = "DIRECT_MESSAGE_ERROR";
export const NEW_DM = "NEW_DM";

const directMessageError = errors => ({
  type: DIRECT_MESSAGE_ERROR,
  errors
});

const receiveDM = payload => ({
  type: RECEIVE_DIRECTMESSAGE,
  payload
});

export const newDM = payload => ({
  type: NEW_DM,
  payload
});

export const createDm = data => dispatch =>
  MessageApi.createDm(data).then(
    payload => dispatch(receiveDM(payload)),
    errors => dispatch(directMessageError(errors))
  );
