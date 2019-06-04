import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_SERVER } from "../actions/server_actions";
import { merge } from "lodash";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  // debugger;
  switch (action.type) {
    case RECEIVE_SERVER:
      return merge({}, state, action.server.users);
    case RECEIVE_CURRENT_USER:
      const { currentUser } = action;
      return merge({}, state, { [currentUser.id]: currentUser });
    default:
      return state;
  }
};

export default usersReducer;
