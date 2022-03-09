import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';

const MyComponent = () => {
  const [text, setText] = React.useState('');

  return (
    <TextInput style={{maxHeight:60,width:200,marginTop:'2%'}}
      label="Password"
      secureTextEntry
      right={<TextInput.Icon name="eye" />}
    />
  );
};

export default MyComponent;