const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ORDERS':
      return action.payload.sort((a, b) => a.orders_id - b.orders_id);

    default:
      return state;
  }
};

export default ordersReducer;
