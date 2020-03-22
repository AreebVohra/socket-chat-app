import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, CheckBox } from 'react-native';

import io from 'socket.io-client';
import { Provider } from 'react-native-paper';

import { BaseURL } from '../../constants/Endpoints';
import AppBar from '../../components/AppBar';

export default class ModeratorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatRoom: [
                { "_id": "5e4ed622434db1126c53fe47", "active": true, "chat_id": 1, "name": "Room 1" },
                { "_id": "5e4ef0fbbe8fbf126cebdb9f", "active": false, "chat_id": 2, "name": "Room 2" },
                { "_id": "5e4ef10cbe8fbf126cebdba0", "active": true, "chat_id": 3, "name": "Room 3" },
                { "_id": "5e767b2433ad712c7c5b641d", "active": false, "chat_id": 4, "name": "Room 4" },
                { "_id": "5e767b2e33ad712c7c5b641e", "active": true, "chat_id": 5, "name": "Room 5" },
                { "_id": "5e767b3933ad712c7c5b641f", "active": false, "chat_id": 6, "name": "Room 6" }
            ],
            checked: true
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
            // this.setState({
            //     chatRoom: [...rooms]
            // })
        })
    }

    getRooms() { this.socket.emit('roomsAvailable') }

    componentWillUnmount() {
        this.socket.removeEventListener('roomsAvailable')
    }

    checkThisBox = (itemID) => {
        let room = this.state.chatRoom;
        room[itemID].active = !room[itemID].active
        this.setState({ chatRoom: room })
    }

    render() {
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
                        renderItem={({ item, index }) => (
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
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <CheckBox
                            value={this.state.checked}
                            onValueChange={() => this.setState({ checked: !this.state.checked })}
                        />
                    </View>
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