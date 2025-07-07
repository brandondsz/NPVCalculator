import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import NpvCalculator from './components/NpvCalculator/NpvCalculator';

function App() {
  return (
    <div className="App">
      <header className="bg-light py-4 mb-4 shadow">
        <div className="container">
          <h1 className="text-center">NPV Calculator</h1>
          <p className="text-center text-muted">
            Calculate Net Present Value for your investment decisions
          </p>
        </div>
      </header>
      
      <main>
        <NpvCalculator data-testid="npv-calculator" />
      </main>
      
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <p className="text-center mb-0">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;