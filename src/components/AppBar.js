import React, { Component } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

class AppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false,
        };
    }

    _openMenu = () => this.setState({ menuVisible: true });

    _closeMenu = () => this.setState({ menuVisible: false });

    _logout = async () => {
        await AsyncStorage.multiRemove(['@userID', '@username', '@userImage', '@role', '@token']);
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        const { title, goBack, actions } = this.props;
        return (
            <Appbar.Header style={{ backgroundColor: '#005f51' }}>
                {
                    goBack === null
                        ? null
                        : <Appbar.BackAction color={'#ffffff'} onPress={goBack} />
                }
                <Appbar.Content color={'#ffffff'} title={title} />
                {
                    actions === null
                        ? null
                        : actions.map((value, index) =>
                            <Appbar.Action color={'#ffffff'} key={index} icon={value.icon} onPress={value.onPress} />
                        )
                }
                <Menu
                    visible={this.state.menuVisible}
                    onDismiss={this._closeMenu}
                    anchor={
                        <Appbar.Action
                            color="white"
                            icon="dots-vertical"
                            onPress={this._openMenu}
                        />
                    }>
                    <Menu.Item title="Logout" onPress={this._logout} />
                </Menu>
            </Appbar.Header>
        )
    }
}

export default AppBar;