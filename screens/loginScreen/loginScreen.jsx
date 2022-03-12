import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import PasswordInput from '../../components/TextInput/passwordInput';
import MailInput from '../../components/TextInput/mailInput';
import Button from '../../components/Button/button';
import RegisterButton from '../../components/Button/registerButton';


export default function LoginScreen({navigation}) {
  console.log(navigation);
  return (

    <View style={styles.container}>
    <StatusBar style="auto" />

      <Text>Covid APp</Text>
      <MailInput />
      <PasswordInput />

      <Button text="Ingresar" />
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
