import { combineReducers } from "redux";
import modal from "./modal_reducer";
import channel from "./edit_channel_reducer";
import currentDm from "./current_dm";

export default combineReducers({
  modal,
  channel,
  currentDm
});
