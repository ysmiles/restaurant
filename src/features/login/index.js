import * as actions from './actions';
import reducer from './reducer';

import Login from './views/login';
import Register from './views/register';

const view = { login: Login, register: Register };

export { actions, reducer, view };
