import * as React from 'react';
import { Button } from 'react-native-paper';

const MyComponent = ({navigation}) => (
  <Button style={{width:200,marginTop:10}}  mode="contained" onPress={()=>navigation.push("Register")}>
    Registrarse
  </Button>
);

export default MyComponent;