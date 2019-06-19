import {
  DIRECT_MESSAGE_ERROR,
  RECEIVE_DIRECTMESSAGE
} from "../actions/directmessage_action";
import { CLOSE_MODAL } from "../actions/modal_actions";

const directMessageErrorReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case DIRECT_MESSAGE_ERROR:
      return action.errors.responseJSON;
    case RECEIVE_DIRECTMESSAGE:
    case CLOSE_MODAL:
      return [];
    default:
      return state;
  }
};

export default directMessageErrorReducer;
