import React from 'react';
import Forecast from './Forecast';

function App() {
  return (
    <div style={container}>
      <div style={header}>
        <h1 style={h1}>React Weather App</h1>
      </div>

      <main>
        <Forecast />
      </main>
      <footer style={footer}>Page created by Me</footer>
    </div>
  );
}

const container = {
  height: '100vh',
  padding: '0',
  margin: '0 auto',
  boxSizing: 'borderBox',
  overflowX: 'hidden',
};

const header = {
  width: '100%',
  padding: '0.5rem',
  backgroundColor: 'lightblue',
  marginBottom: '1rem',
};

const h1 = {
  textAlign: 'center',
};

const footer = {
  position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%',
  backgroundColor: 'lightblue',
  fontSize: '1.5rem',
  textAlign: 'center',
  marginTop: '2rem',
  padding: '1rem',
};

export default App;
