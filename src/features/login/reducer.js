const initialstate = {
  loginStatus: false,
  userinfo: {}
};

function reducer(state = initialstate, action) {
  if (action && action.type === 'LOGIN_STATUS') {
    return {
      loginStatus: action.payload,
      userinfo: {
        username: 'Tom'
      }
    };
  } else {
    return state;
  }
}

export default reducer;
