import { combineReducers } from "redux";
import modal from "./modal_reducer";
import channel from "./edit_channel_reducer";

export default combineReducers({
  modal,
  channel
});
