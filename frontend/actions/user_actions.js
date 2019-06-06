export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_DATA = "RECEIVE_DATA";

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const receiveData = data => ({
  type: RECEIVE_DATA,
  data
});
