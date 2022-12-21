import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { createWrapper } from "next-redux-wrapper"
import combineReducer from "./reducers"

const initalState = {
  records:[
    {
      date:"5.2.2022",
      language:"python",
      rating:2,
      comment:"Good",
      time:4,
      key:0
    },
    {
      date:"5.2.2022",
      language:"python",
      rating:2,
      comment:"Good",
      time:4,
      key:0
    }
  ]
}

const middleware = [thunk]

export const store = createStore(
  combineReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
)

const makeStore = () => store

export const wrapper = createWrapper(makeStore)