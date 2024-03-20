import React from 'react';
import logo from './logo.svg';
import './App.css';
import Articles from './pages/articles/articles';
import Header from './components/header/header';

function App() {
  return (
    <div className="App">
      <Header />
      <Articles />
    </div>
  );
}

export default App;
