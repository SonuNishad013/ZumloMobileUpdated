import { applyMiddleware, createStore } from "redux";
import navigationDebouncer from "react-navigation-redux-debouncer";
import { rootReducer } from "../reducers";
const thunkMiddleware = require("redux-thunk").thunk;
const store = createStore(
  rootReducer,
  applyMiddleware(navigationDebouncer(600), thunkMiddleware)
);

export default store;
