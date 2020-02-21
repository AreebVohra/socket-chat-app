import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // componentDidMount = async () => {
  //   const value = await AsyncStorage.getItem('@userID');
  //   if (value !== null) {
  //     console.log(value);
  //   } else {
  //     console.log("not present");
  //   }
  // }

  render() {
    StatusBar.setHidden(true)
    return (
      <AppNavigator />
    );
  }
}
