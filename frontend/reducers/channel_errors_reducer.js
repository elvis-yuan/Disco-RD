import { RECEIVE_ERRORS, REMOVE_ERRORS } from "../actions/session_actions";
import { CLOSE_MODAL } from "../actions/modal_actions";
import { RECEIVE_CHANNEL } from "../actions/channel_actions";

const serverErrorReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.errors.responseJSON;
    case RECEIVE_CHANNEL:
    case REMOVE_ERRORS:
    case CLOSE_MODAL:
      return [];
    default:
      return state;
  }
};

export default serverErrorReducer;
