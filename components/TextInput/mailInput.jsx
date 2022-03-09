import * as React from 'react';
import { TextInput } from 'react-native-paper';

const MyComponent = () => {
  const [text, setText] = React.useState('');

  return (
    <TextInput style={{maxHeight:60,width:200,marginTop:'2%'}}
      label="email"
      right={<TextInput.Icon name="mail" />}
    />
  );
};

export default MyComponent;