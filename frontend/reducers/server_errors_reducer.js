import { RECEIVE_ERRORS, REMOVE_ERRORS } from "../actions/session_actions";

import { RECEIVE_SERVER } from "../actions/server_actions";

const serverErrorReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.errors.responseJSON;
    case RECEIVE_SERVER:
      return [];
    case REMOVE_ERRORS:
      return [];
    default:
      return state;
  }
};

export default serverErrorReducer;
