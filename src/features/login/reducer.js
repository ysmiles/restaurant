const initialstate = {
  loginStatus: false,
  customer_id: 0
};

function reducer(state = initialstate, action) {
  if (action && action.type === 'LOGIN_STATUS') {
    return {
      loginStatus: action.payload.status,
      customer_id: action.payload.id
    };
  } else {
    return state;
  }
}

export default reducer;
