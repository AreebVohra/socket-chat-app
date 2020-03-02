import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <StatusBar backgroundColor="#034f4a" />
        <AppNavigator />
      </View>
    );
  }
}
