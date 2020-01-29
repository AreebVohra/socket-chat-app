import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import { TextInput } from 'react-native-gesture-handler';

export default class ChatRoomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatroom: ''
    };

    this.socket = io('http://192.168.0.34:3000');
  }

  componentDidMount = () => {
    this.socket.emit('')
  }


  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ borderColor: '#000', borderWidth: 1, width: '80%', fontSize: 18 }}
          value={this.state.chatroom}
          onChange={chatroom => this.setState({ chatroom })}
        />
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
  }
})