import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import PasswordInput from '../../components/TextInput/passwordInput';
import MailInput from '../../components/TextInput/mailInput';
import Button from '../../components/Button/button';
import TextInput from '../../components/TextInput/generalInput';

export default function LoginScreen() {
  return (

    <View style={styles.container}>
    <StatusBar style="auto" />

      <Text>Registrate</Text>
      <TextInput label={"Ingrese Nombre"} />
      <MailInput />
      <PasswordInput />
      <PasswordInput label="confirmar password" />
      <Button text="Registrate!" />


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
