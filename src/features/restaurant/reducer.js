function funReturnNewState(state, payload) {
  // function to change state, based on payload
  return [];
}

const templateReducer = function(state = [], action) {
  switch (action.type) {
    case 'TYPE_1': {
      return funReturnNewState(state, action.payload);
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
