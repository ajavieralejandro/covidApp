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
import { useFormik } from 'formik';
import * as Yup from 'yup';




export default function LoginScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(true);
  
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

  const formik = useFormik({
    initialValues:{
      email : '',
      password : '',
    },
    validationSchema:Yup.object({
      email : Yup.string().email('Correo invalido')
      .required('email requerido'),
      password : Yup.string().min(8,'Password requiere 8 caracteres').required('password requerido')
    }),
    onSubmit: (values) => onSubmit(values)
  });

  //const {inputs,subscribe,handleSubmit} =  useForm(initialState,onSubmit);
  return (

    <View style={styles.container}>
    <StatusBar style="auto" />
    {loading?
      <ActivityIndicator/>:null}

      <Text  style={{fontSize:18}}>Inisiar sesion</Text>
      { formik.errors.email && formik.touched.email ? <Text>{formik.errors.email}</Text>:null }
      { formik.errors.password && formik.touched.password ? <Text>{formik.errors.password}</Text>:null }

      <TextInput 
      onBlur={formik.handleBlur('email')}
      value={formik.values.email} onChangeText={formik.handleChange('email')} style={{maxHeight:60,width:200,marginTop:'2%'}}
      label="email"
      right={<TextInput.Icon name="mail" />}
    />     
      <TextInput style={{maxHeight:60,width:200,marginTop:'2%'}}
      label={"password"}
      secureTextEntry
      onBlur={formik.handleBlur('password')}
      value={formik.values.password}
      onChangeText={formik.handleChange('password')}
      right={<TextInput.Icon name="eye" />}
    />

      <Button disabled={formik.errors.email || formik.errors.password } onPress={formik.handleSubmit}>Ingresar</Button>
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
