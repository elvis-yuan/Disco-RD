import { combineReducers } from "redux";
import session from "./session_errors_reducer";
import server from "./server_errors_reducer";
// import channels from "./channels_error_reducer";

const errorsReducer = combineReducers({
  session,
  server
});

export default errorsReducer;
