import { CURRENT_DM } from "../actions/modal_actions";

const currentDm = (state = null, action) => {
  switch (action.type) {
    case CURRENT_DM:
      return action.username;
    default:
      return state;
  }
};

export default currentDm;
