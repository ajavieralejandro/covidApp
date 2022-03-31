import React,{useEffect} from 'react';

import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { Alert } from 'react-native';


const checkToken = async (token,navigation)=>{
  
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' , 'Accept': 'application/json, text/plain, */*','Authorization':`Bearer ${token}` },
    
};


try{fetch('https://secret-refuge-50230.herokuapp.com/api/v1/users/checkToken', requestOptions)
    .then(response =>  response.json().catch(err => {
      console.error(`'${err}' happened, but no big deal!`);
      navigation.navigate('OnBoarding');
    }))
    .then((json)=>{
        console.log(json);
        if(json.status=='Ok')
        navigation.navigate('Root');
        else 
        navigation.navigate('OnBoarding');


    })
  }
    catch(err){
      console.log("Hola estoy aca en error");
      Alert.alert(err.message);
    }

  

}

export default  ({navigation}) =>{


    
const getData = async (navigation) => {
    try {
        
      console.log("Me fijo el valor de value");

      const value = await AsyncStorage.getItem('token');
      console.log("value es : ",value);
      if(value!==null)
        checkToken(value,navigation);
      else
       navigation.navigate('OnBoarding');
    } catch(e) {
      console.log(e.message);
      navigation.navigate('OnBoarding');


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

