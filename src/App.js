import React from 'react';
import './App.css';
import Layout from './Layout'
import { PrimeReactProvider } from 'primereact/api';

function App() {

  return (
    <PrimeReactProvider>
    <div className="App">
   <h1>API</h1>
   <Layout />
    </div>
    </PrimeReactProvider>
  );
}

export default App;
