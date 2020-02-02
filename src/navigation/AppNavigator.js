import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChatScreen from '../screens/ChatScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import UserScreen from '../screens/UserScreen';

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
}, {
    defaultNavigationOptions: {
        headerShown: false,
    },
    initialRouteName: 'User'
});

export default createAppContainer(AppNavigator);