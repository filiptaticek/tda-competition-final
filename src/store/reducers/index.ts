import { combineReducers } from "redux"
import { usersReducer } from "./users_reducer"
import { darkModeReducer } from "./dark_mode_reducer"

export default combineReducers({
  users: usersReducer,
  mode: darkModeReducer,
})