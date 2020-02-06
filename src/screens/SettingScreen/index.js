import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room1: true,
            room2: true,
            room3: true,
        };
    }

    render() {
        const { room1, room2, room3 } = this.state
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '60%' }}>
                    <Text>Room 1</Text>
                    <Checkbox
                        status={room1 ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ room1: !room1 }); }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '60%' }}>
                    <Text>Room 2</Text>
                    <Checkbox
                        status={room2 ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ room2: !room2 }); }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '60%' }}>
                    <Text>Room 3</Text>
                    <Checkbox
                        status={room3 ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ room3: !room3 }); }}
                    />
                </View>
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
