import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import { Checkbox } from 'react-native-paper';
import { BaseURL } from '../../constants/Endpoints';

export default class ChatRoomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRoom: [],
      selectedRoomID: [
        {
          roomID: 1,
          roomStatus: true
        },
        {
          roomID: 2,
          roomStatus: true
        },
        {
          roomID: 3,
          roomStatus: true
        }
      ],
      room1: true
    };

    this.socket = io(BaseURL);
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

  pushRoom = (roomID) => {
    this.state.selectedRoomID.push(roomID)
  }

  render() {
    const { room1 } = this.state
    return (
      <View style={styles.container}>
        {
          this.state.chatRoom.map((v, index) =>
            <View style={{ flexDirection: 'row' }} key={index}>
              <TouchableOpacity
                style={styles.roomButton}
                onPress={() => this.chatRoom([v.chat_id])}
              >
                <Text style={{ fontSize: 18 }}>{v.name}</Text>
              </TouchableOpacity>
            </View>
          )
        }
        <TouchableOpacity
          style={styles.roomButton}
          onPress={() => this.chatRoom([1, 2, 3])}
        >
          <Text style={{ fontSize: 18 }}>All Rooms</Text>
        </TouchableOpacity>
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