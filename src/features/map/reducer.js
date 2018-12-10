function funReturnNewState(state, payload) {
  // function to change state, based on payload
  return [];
}

const templateReducer = function(state = { mapLoaded: false }, action) {
  switch (action.type) {
    case 'MAP/UPDATE': {
      return action.payload;
    }

    case 'TYPE_2': {
      return [
        {
          payload: action.payload
        },
        ...state
      ];
    }

    default: {
      return state;
    }
  }
};

export default templateReducer;
