const foodsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_FOODS':
      return action.payload;

    default:
      return state;
  }
};

export default foodsReducer;
