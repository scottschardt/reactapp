import React, { Component } from 'react';
import TvInputComponent from './components/tvInputComponent';
import './App.css';

export class App extends Component {
  render () {
    return (
    <div className="wrapper">
      <header >
       <TvInputComponent />
      </header>
    </div>
    ) 
  }
}

export default App;
