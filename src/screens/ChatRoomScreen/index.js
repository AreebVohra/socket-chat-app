import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { BaseURL } from '../../constants/Endpoints';

import io from 'socket.io-client';
import { Provider } from 'react-native-paper';
import AppBar from '../../components/AppBar';

export default class ChatRoomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRoom: [],
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
    const allRooms = this.state.chatRoom.map(v => v.chat_id)
    return (
      <View style={styles.container}>
        <Provider>
          <AppBar
            title={this.props.navigation.state.routeName}
            actions={null}
            goBack={null}
            {...this.props}
          />
          <FlatList
            style={{ width: '100%' }}
            data={this.state.chatRoom}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={[styles.roomButton, { backgroundColor: item.active ? 'white' : '#DCDCDC' }]}
                  disabled={!item.active}
                  onPress={() => this.chatRoom([item.chat_id], item.name)}
                >
                  <Text style={{ fontSize: 18 }}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity
            style={[styles.roomButton, { marginHorizontal: '20%' }]}
            onPress={() => this.chatRoom(allRooms, 'All Rooms')}
          >
            <Text style={{ fontSize: 18 }}>All Rooms</Text>
          </TouchableOpacity>
        </Provider>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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