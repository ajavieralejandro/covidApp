import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';

const MyComponent = ({label}) => {
  const [text, setText] = React.useState('');

  return (
    <TextInput style={{maxHeight:60,width:200,marginTop:'2%'}}
      label={label}
    />
  );
};

export default MyComponent;