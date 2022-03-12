
import { Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator } from 'react-navigation-stack';
import { createNavigationContainer, createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
//import screens
import LoginScreen from './screens/loginScreen/loginScreen';
import RegisterScreen from './screens/registerScreen/registerScreen';
import { View,Text } from 'react-native';
import HomeScreen from './screens/homeScreen/homeScreen';

const BaseStack = createStackNavigator({
  Login : {
    screen : LoginScreen
  },
  Register :{
    screen : RegisterScreen
  },
  Home :{
    screen : HomeScreen
  }
  
},{
  initialRouteName : 'Login',
  headerMode : 'none'
});



const DetailScreen = ({navigation}) =>{
  console.log(navigation);
  return(
    <View>
      <Text>
        Hola soy Detail
      </Text>
    </View>
  )
}

const BaseStack2 = createStackNavigator({
  Home : {
    screen : HomeScreen
  },
  Detail : {
    screen : DetailScreen
  }
},{initialRouteKey : 'Home',
headerMode : 'none'
});

/*
export default () =>{
  return(
    <PaperProvider>
      <Aux navigation={this.props.navigation} />
    </PaperProvider>
  )
};*/

export default createAppContainer(BaseStack2);