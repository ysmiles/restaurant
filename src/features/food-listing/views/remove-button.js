import React from 'react';

export default function RemoveButton(props) {
  return (
    <button
      className="RemoveButton"
      onClick={() => props.removeFromCart(props.cartItem)}
    >
      Remove
    </button>
  );
}
