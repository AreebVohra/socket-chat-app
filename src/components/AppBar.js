import * as React from 'react';
import { Appbar, Menu } from 'react-native-paper';

const AppBar = ({ title, goBack, actions, menuVisible, onDismiss, openMenu, logout }) => {
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
                visible={menuVisible}
                onDismiss={onDismiss}
                anchor={
                    <Appbar.Action
                        color="white"
                        icon="dots-vertical"
                        onPress={openMenu}
                    />
                }>
                <Menu.Item title="Logout" onPress={logout} />
            </Menu>
        </Appbar.Header>
    )
};

export default AppBar;