import {
  RECEIVE_ERRORS,
  REMOVE_ERRORS,
  RECEIVE_CURRENT_USER
} from "../actions/session_actions";
import { RECEIVE_SERVER } from "../actions/server_actions";
import { CLOSE_MODAL } from "../actions/modal_actions";

const serverErrorReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.errors.responseJSON;
    case RECEIVE_SERVER:
    case REMOVE_ERRORS:
    case CLOSE_MODAL:
    case RECEIVE_CURRENT_USER:
      return [];
    default:
      return state;
  }
};

export default serverErrorReducer;
