import React,{useEffect} from 'react';

import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { Alert } from 'react-native';
export default  ({navigation}) =>{

    
const getData = async (navigation) => {
    try {
        
      console.log("Me fijo el valor de value");

      const value = await AsyncStorage.getItem('token')
      console.log(value);
      console.log(value!==null);
      if(value!==null) navigation.navigate('Root')
      else
       navigation.navigate('OnBoarding');
    } catch(e) {
      Alert.alert(e.message);
    }
  }
  

    useEffect(() => {
        getData(navigation);
    
    }, [])
    return(
        <View>
        </View>
    )
}

