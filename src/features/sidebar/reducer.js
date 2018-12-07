const defaultState = {
  top: false,
  left: false,
  bottom: false,
  right: false
};

function toggleSidebar(state, payload) {
  return Object.assign({}, state, payload);
}

const templateReducer = function(state = defaultState, action) {
  switch (action.type) {
    case 'SIDEBAR/TOGGLE': {
      return toggleSidebar(state, action.payload);
    }

    default: {
      return state;
    }
  }
};

export default templateReducer;
