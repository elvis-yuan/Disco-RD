export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_DATA = "RECEIVE_DATA";
export const REMOVE_DATA = "REMOVE_DATA";

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const receiveData = data => ({
  type: RECEIVE_DATA,
  data
});

export const removeData = data => ({
  type: REMOVE_DATA,
  data
});
