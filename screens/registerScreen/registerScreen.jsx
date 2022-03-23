import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { TextInput } from 'react-native-paper';
import  useForm  from '../../hooks/useForms';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';




export default function LoginScreen({navigation}) {
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
    <TextInput label={"nombre"} value={inputs.name} onChangeText={subscribe('name')} style={{maxHeight:60,width:200,marginTop:'2%'}} />
    <TextInput label={"apellido"} value={inputs.lastName} onChangeText={subscribe('lastName')} style={{maxHeight:60,width:200,marginTop:'2%'}} />

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
          <TextInput style={{maxHeight:60,width:200,marginTop:'2%'}}
      label={"confirma el password"}
      secureTextEntry
      value={inputs.passwordConfirm}
      onChangeText={subscribe('passwordConfirm')}
      right={<TextInput.Icon name="eye" />}
    />

<Button onPress={()=>handleSubmit()}>Registrate</Button>

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
