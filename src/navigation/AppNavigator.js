import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChatScreen from '../screens/ChatScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';

const AppNavigator = createStackNavigator({
    Chat: {
        screen: ChatScreen,
    },
    Chatroom: {
        screen: ChatRoomScreen
    }
}, {
    defaultNavigationOptions: {
        headerShown: false,
    },
    initialRouteName: 'Chatroom'
});

export default createAppContainer(AppNavigator);