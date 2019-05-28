import errors from "./errors_reducer";
import session from "./session_reducer";
import entities from "./entities_reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  entities,
  session,
  errors
});

export default rootReducer;
