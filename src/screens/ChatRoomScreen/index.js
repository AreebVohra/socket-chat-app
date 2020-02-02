import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import io from 'socket.io-client';

export default class ChatRoomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRoom: [],
      selectedRoomID: null
    };

    this.socket = io('http://192.168.100.7:3000');
    this.onRecieveRooms = this.onRecieveRooms.bind(this)
    this.getRooms = this.getRooms.bind(this);
    this.getRooms();
    this.onRecieveRooms();
  }

  chatRoom = (chatID) => {
    this.socket.emit('chatCreated', chatID);
    this.setState({ selectedRoomID: chatID })
  }

  onRecieveRooms() {
    this.socket.on('onRoomsAvailable', (rooms) => {
      this.setState({
        chatRoom: [...rooms]
      })
    })
  }

  getRooms() { this.socket.emit('onRoomsAvailable') }

  componentWillUnmount() {
    this.socket.off('onRoomsAvailable')
  }

  render() {
    return (
      <View style={styles.container} >
        {
          this.state.chatRoom.map(v => <Button key={v._id} title={v.name} onPress={() => this.chatRoom(v.chat_id)} />)
        }
        < Button title="Goto Chat" onPress={() => this.props.navigation.navigate('Chat', { selected: this.state.selectedRoomID })
        } />
      </View >
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