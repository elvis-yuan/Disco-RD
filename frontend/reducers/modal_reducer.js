import {
  OPEN_MODAL,
  CLOSE_MODAL,
  EDIT_CHANNEL
} from "../actions/modal_actions";
// import { RECEIVE_SERVER } from "../actions/server_actions";

export default function modalReducer(state = null, action) {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return null;
    // case EDIT_CHANNEL:
    //   return action.id
    default:
      return state;
  }
}
