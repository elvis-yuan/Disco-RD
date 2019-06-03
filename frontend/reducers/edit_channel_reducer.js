import { EDIT_CHANNEL, CLOSE_MODAL } from "../actions/modal_actions";

export default function modalReducer(state = null, action) {
  Object.freeze(state);
  switch (action.type) {
    case EDIT_CHANNEL:
      return action.id;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}
