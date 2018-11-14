import React from 'react';

import FoodListing from '../features/food-listing';

// will get data from back-end
import data from '../data/foods.json';

export default function Homepage(props) {
  return (
    <div>
      <h2>Homepage</h2>
      <FoodListing foods={data.foods} />
    </div>
  );
}
