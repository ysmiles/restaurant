import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { reducer as loginReducer } from './login';
import cartReducer from './features/cart/reducer';

// const win = window;

// root reducer
const reducer = combineReducers({
  login: loginReducer,
  cart: cartReducer
});

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant')());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  window && window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default createStore(reducer, {}, storeEnhancers);
