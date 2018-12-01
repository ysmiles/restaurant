import React from 'react';

import { view as Navigation } from './features/navigation';
import Router from './Router';

function App() {
  return (
    <div className="Page-container">
      <h1>Restaurant platform</h1>
      <Navigation />
      <Router />
    </div>
  );
}

export default App;
