import { combineReducers } from "redux";
import session from "./session_errors_reducer";
import server from "./server_errors_reducer";
import channel from "./channel_errors_reducer";

const errorsReducer = combineReducers({
  session,
  server
  // channel
});

export default errorsReducer;
