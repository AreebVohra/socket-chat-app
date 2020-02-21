import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChatScreen from '../screens/ChatScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import UserScreen from '../screens/UserScreen';
import SettingScreen from '../screens/SettingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Register: {
        screen: RegisterScreen
    },
    Login: {
        screen: LoginScreen
    },
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
    initialRouteName: 'Home'
});

export default createAppContainer(AppNavigator);