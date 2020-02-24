import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    StatusBar.setHidden(true)
    return (
      <AppNavigator />
    );
  }
}
