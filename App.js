
import { createStackNavigator } from 'react-navigation-stack';
import { createNavigationContainer, createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
//import screens
import LoginScreen from './screens/loginScreen/loginScreen';
import RegisterScreen from './screens/registerScreen/registerScreen';
import { View,Text } from 'react-native';
import HomeScreen from './screens/homeScreen/homeScreen';
import authLoading from './screens/authLoading/authLoading';

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
  authLoading,
  OnBoarding : OnBoarding,
  Root : AppNavigator
},{
  initialRouteName : 'authLoading'
})





export default createAppContainer(BaseStack);