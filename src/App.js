import React from 'react';

import { view as Home } from './features/food-listing';
import { view as Navigation } from './features/navigation';
import { view as Login } from './features/login';
import { view as Cart } from './features/cart';

function App() {
  return (
    <div className="page-container">
      <h1>Restaurant platform</h1>
      <Navigation />
      <Home />
      <Cart />
      <Login />
    </div>
  );
}

export default App;
