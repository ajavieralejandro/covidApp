import * as React from 'react';
import { Button } from 'react-native-paper';

const MyComponent = ({text,navigation}) => (
  <Button style={{width:200,marginTop:10}}  mode="contained">
    {text}
  </Button>
);

export default MyComponent;