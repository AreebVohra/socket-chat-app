import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChatScreen from '../screens/ChatScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import SettingScreen from '../screens/SettingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AppNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
    },
    Register: {
        screen: RegisterScreen,
    },
    Chatrooms: {
        screen: ChatRoomScreen
    },
    Chat: {
        screen: ChatScreen,
        navigationOptions: ({ navigation }) => ({
            title: navigation.getParam('roomName'),
        }),
    },
    Setting: {
        screen: SettingScreen
    }
}, {
    defaultNavigationOptions: {
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#005f51',
        },
        headerShown: false
    },
});

export default createAppContainer(AppNavigator);