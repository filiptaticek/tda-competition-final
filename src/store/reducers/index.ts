import { combineReducers } from "redux"
import { recordsReducer } from "./records_reducer"
import { sidebarReducer } from "./sidebar_reducer"

export default combineReducers({
  records: recordsReducer,
  sidebar: sidebarReducer
})