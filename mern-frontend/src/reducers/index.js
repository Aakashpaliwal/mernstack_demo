import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import todoReducers from "./todoReducers";
import startupReducers from "./startupReducers";

export default combineReducers({
  auth: authReducers,
  error: errorReducers,
  todo: todoReducers,
  startup: startupReducers,
});
