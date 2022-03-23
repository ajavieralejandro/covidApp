import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import { Button } from 'react-native-paper';
import RegisterButton from '../../components/Button/registerButton';
import  useForm  from '../../hooks/useForms';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function LoginScreen({navigation}) {
  const [loading, setLoading] = useState(false);

  const initialState = {
    email : '',
    password : ''
  }
  const onSubmit = async values =>{
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };


  try{fetch('https://secret-refuge-50230.herokuapp.com/api/v1/users/login', requestOptions)
      .then(response =>response.json())
      .then((json)=>{
        console.log("Hola");
        console.log(json);
        if(json.status==='fail')
          Alert.alert(json.message);
        else{
          AsyncStorage.setItem('token',json.token);
          navigation.navigate("Home");

        }


      })
    }
      catch(err){
        Alert.alert(err.message);
      }
      setLoading(false);

    
    
  }
  const {inputs,subscribe,handleSubmit} =  useForm(initialState,onSubmit);
  return (

    <View style={styles.container}>
    <StatusBar style="auto" />
    {loading?<View style={{
        position:"absolute",
        top:'50%',
        left:'50%'
      }}>
      <ActivityIndicator style={{
      }}
    /></View>:null}

      <Text  style={{fontSize:18}}>Inisiar sesion</Text>
      <TextInput value={inputs.email} onChangeText={subscribe('email')} style={{maxHeight:60,width:200,marginTop:'2%'}}
      label="email"
      right={<TextInput.Icon name="mail" />}
    />     
      <TextInput style={{maxHeight:60,width:200,marginTop:'2%'}}
      label={"password"}
      secureTextEntry
      value={inputs.password}
      onChangeText={subscribe('password')}
      right={<TextInput.Icon name="eye" />}
    />

      <Button onPress={()=>handleSubmit()}>Ingresar</Button>
      <Button onPress={()=>navigation.navigate("Register")}>Crear Nuevo Usuario</Button>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    paddingTop : '5%'
  }
});
