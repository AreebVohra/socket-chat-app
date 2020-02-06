import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChatScreen from '../screens/ChatScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import UserScreen from '../screens/UserScreen';
import SettingScreen from '../screens/SettingScreen';

const AppNavigator = createStackNavigator({
    User: {
        screen: UserScreen
    },
    Chatroom: {
        screen: ChatRoomScreen
    },
    Chat: {
        screen: ChatScreen,
    },
    Setting: {
        screen: SettingScreen
    }
}, {
    defaultNavigationOptions: {
        headerShown: false,
    },
    initialRouteName: 'User'
});

export default createAppContainer(AppNavigator);