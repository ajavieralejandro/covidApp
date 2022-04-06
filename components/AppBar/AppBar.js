import * as React from 'react';
import { Appbar } from 'react-native-paper';

export default  ({risk}) => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header>
      <Appbar.Content title="Contactos" subtitle={"riesgo : "+risk} />
    </Appbar.Header>
  );
};