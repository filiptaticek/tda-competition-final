import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { createWrapper } from "next-redux-wrapper"
import combineReducer from "./reducers"

const initalState = {
  records:[],
  sidebar:false,
  users:[],
  tags:[],
  page:"home"
}

const middleware = [thunk]

export const store = createStore(
  combineReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
)

const makeStore = () => store

export const wrapper = createWrapper(makeStore)