import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_SERVER } from "../actions/server_actions";
import { RECEIVE_USER } from "../actions/user_actions";
import { RECEIVE_CHANNEL } from "../actions/channel_actions";
import { merge } from "lodash";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_USER:
      const { user } = action;
      return merge({}, state, { [user.id]: user });
    case RECEIVE_SERVER:
      return merge({}, state, action.server.users);
    case RECEIVE_CURRENT_USER:
      const { currentUser } = action;
      return merge({}, state, { [currentUser.id]: currentUser });
    case RECEIVE_CHANNEL:
      const { users } = action.channel;
      return merge({}, state, users);
    default:
      return state;
  }
};

export default usersReducer;
