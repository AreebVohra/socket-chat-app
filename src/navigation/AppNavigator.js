import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChatScreen from '../screens/ChatScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import SettingScreen from '../screens/SettingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AppNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    Register: {
        screen: RegisterScreen
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
});

export default createAppContainer(AppNavigator);