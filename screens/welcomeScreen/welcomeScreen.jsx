import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import PasswordInput from '../../components/TextInput/passwordInput';
import MailInput from '../../components/TextInput/mailInput';
import Button from '../../components/Button/button';

export default function WelcomeScreen() {
  return (

    <View style={styles.container}>
    <StatusBar style="auto" />

      <Text>Covid APp</Text>
      <MailInput />
      <PasswordInput />

      <Button text="Ingresar" />
      <Button text="Registrarse" />


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
