import React from 'react';
import { SiteHeader } from './components/SiteHeader';
import { EmiCalculator } from './components/EmiCalculator';

function App() {
  return (
    <div id="App" className="font-opensans">
      <SiteHeader />
      <EmiCalculator />
    </div>
  );
}

export default App;
