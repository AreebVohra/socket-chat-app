import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
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

  chatRoom = (chatID, roomName) => {
    this.socket.emit('chatSelected', chatID);
    this.props.navigation.navigate('Chat', { selected: chatID, roomName })
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
      <View style={styles.container}>
        <FlatList
          style={{ width: '100%' }}
          data={this.state.chatRoom}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity
                style={styles.roomButton}
                onPress={() => this.chatRoom([item.chat_id], item.name)}
              >
                <Text style={{ fontSize: 18 }}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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