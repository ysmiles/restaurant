import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { reducer as loginReducer } from './features/login';
import { reducer as cartReducer } from './features/cart';
import { reducer as foodsReducer } from './features/food-listing';
import { reducer as formReducer } from 'redux-form';
import { reducer as ordersReducer } from './features/order';

// const win = window;

// root reducer
const reducer = combineReducers({
  login: loginReducer,
  cart: cartReducer,
  foods: foodsReducer,
  form: formReducer,
  orders: ordersReducer
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
