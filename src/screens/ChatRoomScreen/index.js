import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import io from 'socket.io-client';

export default class ChatRoomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatroom: '',
    };

    this.socket = io('http://192.168.0.34:3000');
  }

  chatRoom = (chatID) => {
    this.socket.emit('chatCreated', chatID);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="chat 1" onPress={() => this.chatRoom(1)} />
        <Button title="chat 2" onPress={() => this.chatRoom(2)} />
        <Button title="Goto Chat" onPress={() => this.props.navigation.navigate('Chat')} />
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