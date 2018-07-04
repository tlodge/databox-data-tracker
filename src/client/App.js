import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import Flows from './features/flows/components/Flows'

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store} >
        <Flows></Flows>
      </Provider >
    );
  }
}

export default App;
