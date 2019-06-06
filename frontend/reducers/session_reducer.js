import { RECEIVE_CURRENT_USER, LOGOUT } from "../actions/session_actions";
import { merge } from "lodash";

const _nullSession = {
  currentUser: null,
  prevUser: null
};

const sessionReducer = (state = _nullSession, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { currentUser: action.currentUser.id });
    case LOGOUT:
      const prevUser = state.currentUser;
      return merge({}, state, { currentUser: null, prevUser: prevUser });
    default:
      return state;
  }
};

export default sessionReducer;
