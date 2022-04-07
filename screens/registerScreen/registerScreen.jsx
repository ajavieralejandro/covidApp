import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { TextInput } from 'react-native-paper';
import  useForm  from '../../hooks/useForms';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';




export default function LoginScreen({navigation}) {

  const formik = useFormik({
    initialValues:{
      name : '',
      lastName : '',
      email : '',
      password : '',
    },
    validationSchema:Yup.object({
      name : Yup.string().required('nombre requerido'),
      lastName : Yup.string().required('apellido requerido'),
      email : Yup.string().email('Correo invalido')
      .required('email requerido'),
      password : Yup.string().min(8,'Password requiere 8 caracteres').required('password requerido'),
      passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'El password no coincide')    }).required('confirmacion de password requerida'),
      onSubmit:(values) =>onSubmit(values)
  });

  const initialState = {
    name : '',
    lastName : '',
    email : '',
    password : '',
    passwordConfirm : ''
  };
  const onSubmit = (values) => {
    console.log("values es : ");
    console.log(values);
  


  try{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };
    fetch('https://secret-refuge-50230.herokuapp.com/api/v1/users/signup', requestOptions)
      .then(response => response.json())
      .then(data=> {
        console.log(data);
        if(data.status==="error")
          Alert.alert(data.message);
        else
          navigation.navigate("Home");
 
      });
     
    }
      catch(err){
        Alert.alert(err.message);
      }
    
    
  }
  
  const {inputs,subscribe,handleSubmit} =  useForm(initialState,onSubmit);


  return (

    <View style={styles.container}>
    <StatusBar style="auto" />

    <Text style={{fontSize:18}}>Cree un nuevo usuario</Text>
    { formik.errors.name && formik.touched.name ? <Text>{formik.errors.name}</Text>:null }
    { formik.errors.lastName && formik.touched.lastName ? <Text>{formik.errors.lastName}</Text>:null }
    { formik.errors.email && formik.touched.email ? <Text>{formik.errors.email}</Text>:null }
      { formik.errors.password && formik.touched.password ? <Text>{formik.errors.password}</Text>:null }
      { formik.errors.passwordConfirm && formik.touched.passwordConfirm ? <Text>{formik.errors.passwordConfirm}</Text>:null }


    <TextInput label={"nombre"} onBlur={formik.handleBlur('name')} value={formik.name} onChangeText={formik.handleChange('name')} style={{maxHeight:60,width:200,marginTop:'2%'}} />
    <TextInput label={"apellido"} onBlur={formik.handleBlur('lastName')} value={formik.lastName} onChangeText={formik.handleChange('lastName')} style={{maxHeight:60,width:200,marginTop:'2%'}} />

    <TextInput value={formik.email} onBlur={formik.handleBlur('email')} onChangeText={formik.handleChange('email')} style={{maxHeight:60,width:200,marginTop:'2%'}}
      label="email"
      right={<TextInput.Icon name="mail" />}
    />     
      <TextInput style={{maxHeight:60,width:200,marginTop:'2%'}}
      label={"password"}
      secureTextEntry
      value={formik.values.password}
      onChangeText={formik.handleChange('password')}
      onBlur={formik.handleBlur('password')}
      right={<TextInput.Icon name="eye" />}
    />
          <TextInput style={{maxHeight:60,width:200,marginTop:'2%'}}
      label={"confirma el password"}
      secureTextEntry
      value={formik.values.passwordConfirm}
      onChangeText={formik.handleChange('passwordConfirm')}
      onBlur={formik.handleBlur('passwordConfirm')}
      right={<TextInput.Icon name="eye" />}
    />

<Button onPress={formik.handleSubmit}>Registrate</Button>

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
