import * as React from 'react';
import { Button } from 'react-native-paper';

const MyComponent = ({text,navigation,onPress}) => (
  <Button style={{width:200,marginTop:10}}  mode="contained" onPress={()=>onPress()}>
    {text}
  </Button>
);

export default MyComponent;