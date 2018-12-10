const cartWithoutItem = (cart, item) =>
  cart.filter(cartItem => cartItem.item_id !== item.item_id);

const itemInCart = (cart, item) =>
  cart.filter(cartItem => cartItem.item_id === item.item_id)[0];

const addToCart = (cart, item) => {
  const cartItem = itemInCart(cart, item);

  return cartItem === undefined
    ? [...cartWithoutItem(cart, item), { ...item, quantity: 1 }]
    : [
        ...cartWithoutItem(cart, item),
        { ...cartItem, quantity: cartItem.quantity + 1 }
      ];
};

const removeFromCart = (cart, item) => {
  return item.quantity === 1
    ? [...cartWithoutItem(cart, item)]
    : [
        ...cartWithoutItem(cart, item),
        { ...item, quantity: item.quantity - 1 }
      ];
};

const removeAllFromCart = (cart, item) => {
  return [...cartWithoutItem(cart, item)];
};

const sort = items => items.sort((a, b) => a.item_id - b.item_id);

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return sort(addToCart(state, action.payload));

    case 'REMOVE':
      return sort(removeFromCart(state, action.payload));

    case 'REMOVE_ALL':
      return sort(removeAllFromCart(state, action.payload));

    default:
      return state;
  }
};

export default cartReducer;
