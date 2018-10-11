const initialstate = {
  authenticated: false,
  userinfo: {}
};

function reducer(state = initialstate, action) {
  if (action) {
    return initialstate;
  } else {
    return state;
  }
}

export default reducer;
