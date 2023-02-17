import { combineReducers } from "redux"
import { recordsReducer } from "./records_reducer"
import { usersReducer } from "./users_reducer"
import { tagsReducer } from "./tags_reducer"
import { pageReducer } from "./page_reducer"
import { darkModeReducer } from "./dark_mode_reducer"
import { userReducer } from "./user_reducer"

export default combineReducers({
  records: recordsReducer,
  users: usersReducer,
  tags: tagsReducer,
  page: pageReducer,
  mode: darkModeReducer,
  user: userReducer
})