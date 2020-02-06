import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';

export default class ChatRoomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRoom: [],
      selectedRoomID: null
    };

    this.socket = io('http://192.168.0.34:3000');
    this.onRecieveRooms = this.onRecieveRooms.bind(this)
    this.getRooms = this.getRooms.bind(this);
    this.getRooms();
    this.onRecieveRooms();
  }

  chatRoom = (chatID) => {
    this.socket.emit('chatSelected', chatID);
    this.props.navigation.navigate('Chat', { selected: chatID })
  }

  onRecieveRooms() {
    this.socket.on('roomsAvailable', (rooms) => {
      this.setState({
        chatRoom: [...rooms]
      })
    })
  }

  getRooms() { this.socket.emit('roomsAvailable') }

  componentWillUnmount() {
    this.socket.removeEventListener('roomsAvailable')
  }

  render() {
    return (
      <View style={styles.container} >
        {
          this.state.chatRoom.map(v =>
            <TouchableOpacity key={v._id}
              style={styles.roomButton}
              onPress={() => this.chatRoom(v.chat_id)}
            >
              <Text style={{ fontSize: 18 }}>{v.name}</Text>
            </TouchableOpacity>
          )
        }
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
  roomButton: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: '15%',
    paddingVertical: '5%',
    borderRadius: 15,
    marginVertical: '2%'
  },
})