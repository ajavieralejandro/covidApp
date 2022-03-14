import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import Button from '../../components/Button/button';
import RegisterButton from '../../components/Button/registerButton';
import  useForm  from '../../hooks/useForms';
import { TextInput } from 'react-native-paper';



export default function LoginScreen({navigation}) {
  const initialState = {
    email : '',
    password : ''
  }
  const onSubmit = values =>{
    console.log(values);
  }
  const {inputs,subscribe,handleSubmit} =  useForm(initialState,onSubmit);
  return (

    <View style={styles.container}>
    <StatusBar style="auto" />

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

      <Button text="Ingresar" onPress={()=>handleSubmit()} />
      <RegisterButton navigation={navigation}  />


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
