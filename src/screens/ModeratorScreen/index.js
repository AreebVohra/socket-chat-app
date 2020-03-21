import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import io from 'socket.io-client';
import { Provider } from 'react-native-paper';

import { BaseURL } from '../../constants/Endpoints';
import AppBar from '../../components/AppBar';

export default class ModeratorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
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