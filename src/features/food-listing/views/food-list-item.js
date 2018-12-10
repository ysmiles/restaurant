import React from 'react';

import AddButton from './add-button';
import RemoveButton from './remove-button';

export default function FoodListItem(props) {
  return (
    <div className="Food-list-item">
      <h3>{props.food.name}</h3>
      <img
        height={100}
        title={props.food.name}
        src={`/image/${props.food.photo}`}
      />
      <div>{props.food.description}</div>
      <div>{props.food.unit_price}</div>
      <div>
        <AddButton
          cartItem={props.cartItem}
          food={props.food}
          addToCart={props.addToCart}
        />

        {props.cartItem ? (
          <RemoveButton
            cartItem={props.cartItem}
            food={props.food}
            removeFromCart={props.removeFromCart}
          />
        ) : null}
      </div>
    </div>
  );
}
