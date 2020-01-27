import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChatScreen from '../screens/ChatScreen';

const AppNavigator = createStackNavigator({
    Chat: {
        screen: ChatScreen,
    },
}, {
    defaultNavigationOptions: {
        headerShown: false
    }
});

export default createAppContainer(AppNavigator);