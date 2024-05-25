import React from 'react';
import NasaPhoto from './NasaPhoto';
import AsteroidTable from './AsteroidTable';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NASA Photo of the Day</h1>
      </header>
      <main>
        <NasaPhoto />
        <h1>NASA Asteroid NeoWs</h1>
        <AsteroidTable />
      </main>
    </div>
  );
};

export default App;

