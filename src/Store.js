import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { reducer as sampleReducer } from "./samplemodule";
import { reducer as loginReducer } from "./login";

const win = window;

const reducer = combineReducers({
  samplemodule: sampleReducer,
  login: loginReducer
});

const middlewares = [];
if (process.env.NODE_ENV !== "production") {
  middlewares.push(require("redux-immutable-state-invariant")());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  win && win.devToolsExtension ? win.devToolsExtension() : f => f
);

export default createStore(reducer, {}, storeEnhancers);
