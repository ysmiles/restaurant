import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { reducer as loginReducer } from './features/login';
import { reducer as cartReducer } from './features/cart';
import { reducer as foodsReducer } from './features/food-listing';
import { reducer as formReducer } from 'redux-form';
import { reducer as ordersReducer } from './features/order';
import { reducer as userReducer } from './features/user';
import { reducer as searchbarReducer } from './features/searchbar';
import { reducer as sidebarReducer } from './features/sidebar';
import { reducer as mapReducer } from './features/map';

// const win = window;

// root reducer
// main state for all
const reducer = combineReducers({
  login: loginReducer,
  cart: cartReducer,
  foods: foodsReducer,
  form: formReducer,
  orders: ordersReducer,
  user: userReducer,
  searchbar: searchbarReducer,
  sidebar: sidebarReducer,
  mapStatus: mapReducer
});

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant')());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  window && window.devToolsExtension ? window.devToolsExtension() : f => f
);

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const store = createStore(reducer, persistedState, storeEnhancers);

store.subscribe(() => {
  let theState = store.getState();
  delete theState.mapStatus;
  localStorage.setItem('reduxState', JSON.stringify(theState));
});

export default store;
