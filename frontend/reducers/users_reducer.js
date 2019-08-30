import { RECEIVE_CURRENT_USER, CO_USER, DC_USER } from "../actions/session_actions";
import { RECEIVE_SERVER, RECEIVE_DM } from "../actions/server_actions";
import { RECEIVE_USER, RECEIVE_DATA } from "../actions/user_actions";
import { RECEIVE_CHANNEL } from "../actions/channel_actions";
import { RECEIVE_DIRECTMESSAGE, NEW_DM } from "../actions/directmessage_action";
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
    case RECEIVE_DATA:
      return merge({}, state, { [action.data.user.id]: action.data.user });
    case RECEIVE_DM:
      return merge({}, state, action.server.users);
    case RECEIVE_DIRECTMESSAGE:
    case NEW_DM:
      return merge({}, state, {
        [action.payload.user.id]: action.payload.user
      });
    case CO_USER:
      if (state[action.user]) {
        const connected = { active: true }
        return merge({}, state, { [action.user]: connected });
      }
    case DC_USER:
      if (state[action.user]){
        const disconnected = { active: false }
        return merge({}, state, { [action.user]: disconnected })
      }
    default:
      return state;
  }
};

export default usersReducer;
