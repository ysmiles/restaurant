import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { view as Navigation } from './features/navigation';
import { view as MapModule } from './features/map';

import Router from './Router';

function App() {
  return (
    <div className="Page-container">
      <h1>Restaurant platform</h1>
      <MuiThemeProvider>
        <Navigation />
        <Router />
        <MapModule />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
