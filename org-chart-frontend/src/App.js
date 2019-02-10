import React, { Component } from 'react';
import './App.css';
import Form from './components/Form'
import Map from './components/map'

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="title text-center">Organizational Chart</h1>
        <Map/>
      </div>
    );
  }
}

export default App;
