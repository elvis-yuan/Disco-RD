export const RECEIVE_VIDEO_CALL = "RECEIVE_VIDEO_CALL";
export const REMOVE_VIDEO_CALL = "REMOVE_VIDEO_CALL";

export const receiveVideoCall = payload => ({
  type: RECEIVE_VIDEO_CALL,
  payload
});

export const removeVideoCall = () => ({
  type: REMOVE_VIDEO_CALL
});
