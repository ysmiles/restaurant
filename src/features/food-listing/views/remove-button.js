import React from 'react';

export default function RemoveButton(props) {
  return (
    <button onClick={() => props.removeFromCart(props.cartItem)}>remove</button>
  );
}
