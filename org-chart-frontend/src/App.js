import React, { Component } from 'react';
import './App.css';
import Map from './components/map'

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="title text-center" id='logo'>MyOrg</h1>
        <Map/>
      </div>
    );
  }
}

export default App;
