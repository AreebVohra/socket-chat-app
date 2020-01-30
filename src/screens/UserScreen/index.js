import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  onSubmit = async () => {
    await AsyncStorage.setItem('@username', this.state.username)
    this.navigateTo('Chat')
  }

  navigateTo = route => this.props.navigation.navigate(route)


  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />
        <Button title="Submit" onPress={this.onSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  textInputStyle: {
    borderColor: '#000',
    borderWidth: 1,
    width: '80%',
    fontSize: 18
  }
})