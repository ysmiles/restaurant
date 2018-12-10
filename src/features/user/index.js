// import * as actions from "./actions";
import reducer from './reducer';
import userview from './views/user';
import detailsview from './views/userdetails';

const view = {
  orders: userview,
  details: detailsview
};

// export { actions, reducer, view };
export { reducer, view };
