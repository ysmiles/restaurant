import React from 'react';

import FoodListing from './food-listing';

// will get data from back-end
import data from '../../../data/foods.json';

export default function Homepage(props) {
  return (
    <div className="food-listing-page">
      <h2>Homepage</h2>
      <FoodListing foods={data.foods} />
    </div>
  );
}
