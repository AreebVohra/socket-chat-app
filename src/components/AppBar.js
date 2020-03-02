import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = ({ title, goBack, actions }) => {
    return (
        <Appbar.Header style={{ backgroundColor: '#005f51' }}>
            <Appbar.BackAction color={'#ffffff'} onPress={goBack} />
            <Appbar.Content color={'#ffffff'} title={title} />
            {
                actions.map((value, index) =>
                    <Appbar.Action color={'#ffffff'} key={index} icon={value.icon} onPress={value.onPress} />
                )
            }
        </Appbar.Header>
    )
};

export default AppBar;