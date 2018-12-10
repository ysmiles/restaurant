const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ORDERS':
      return action.payload.sort((a, b) => a.order_time - b.order_time);

    default:
      return state;
  }
};

export default ordersReducer;
