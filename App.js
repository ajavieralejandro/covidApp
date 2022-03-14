
import { createStackNavigator } from 'react-navigation-stack';
import { createNavigationContainer, createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
//import screens
import LoginScreen from './screens/loginScreen/loginScreen';
import RegisterScreen from './screens/registerScreen/registerScreen';
import { View,Text } from 'react-native';
import HomeScreen from './screens/homeScreen/homeScreen';

const OnBoarding = createStackNavigator({
  Login : {
    screen : LoginScreen
  },
  Register :{
    screen : RegisterScreen
  },

},{
  initialRouteName : 'Login',
});

const AppNavigator = createStackNavigator({
  Home : {
    screen : HomeScreen
  }
},{
  headerMode : 'none'
});

const BaseStack = createSwitchNavigator({
  OnBoarding : OnBoarding,
  Root : AppNavigator
},{
  initialRouteName : 'OnBoarding'
})





export default createAppContainer(BaseStack);