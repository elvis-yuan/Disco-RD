import { signup, login, logout } from "../util/session_api_util.js";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT = "LOGOUT";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const REMOVE_ERRORS = "REMOVE_ERRORS";
export const CO_USER = "CO_USER"
export const DC_USER = "DC_USER"

export const loginUser = user => dispatch =>
  login(user).then(
    currentUser => dispatch(recieveCurrentUser(currentUser)),
    errors => dispatch(receiveErrors(errors))
  );

export const logoutUser = () => dispatch =>
  logout().then(
    () => dispatch(logoutCurrentUser()),
    errors => dispatch(receiveErrors(errors))
  );

export const signupUser = user => dispatch =>
  signup(user).then(
    currentUser => dispatch(recieveCurrentUser(currentUser)),
    errors => dispatch(receiveErrors(errors))
  );

const recieveCurrentUser = currentUser => {
  return { type: RECEIVE_CURRENT_USER, currentUser };
};

const logoutCurrentUser = () => ({
  type: LOGOUT
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const deleteErrors = () => ({
  type: REMOVE_ERRORS
});

export const coUser = (user) => ({
  type: CO_USER,
  user
})

export const dcUser = (user) => ({
  type: DC_USER,
  user
})