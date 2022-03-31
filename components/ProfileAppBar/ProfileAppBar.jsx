import * as React from 'react';
import { Appbar } from 'react-native-paper';
export default () => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header>
      <Appbar.Content title="Perfil" subtitle="Subtitle" />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};