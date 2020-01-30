import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChatScreen from '../screens/ChatScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import UserScreen from '../screens/UserScreen';

const AppNavigator = createStackNavigator({
    User: {
        screen: UserScreen
    },
    Chat: {
        screen: ChatScreen,
    },
    Chatroom: {
        screen: ChatRoomScreen
    }
}, {
    defaultNavigationOptions: {
        headerShown: false,
    }
});

export default createAppContainer(AppNavigator);