const defaultState = {
  customer_id: 0,
  first_name: 'FirstName',
  last_name: 'LastName',
  phone_number: 1231231234,
  email: 'a@bcd.com'
};

const templateReducer = function(state = defaultState, action) {
  switch (action.type) {
    case 'USER/UPDATE': {
      return action.payload; // user information
    }

    case 'USER/RESET': {
      return defaultState;
    }

    default: {
      return state;
    }
  }
};

export default templateReducer;
