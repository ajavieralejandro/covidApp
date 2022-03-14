import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import ContactScreen from '../contactsScreen/contactsScreen';
import ContactList from '../../components/contactList/contactList';
import { color } from 'react-native-elements/dist/helpers';
import { withTheme } from 'react-native-paper';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import  Locations from '../../components/locations/locations';



const MusicRoute = () => <ContactScreen />;

const AlbumsRoute = () => <ContactList />

const RecentsRoute = () => <Locations />;

const MyComponent = (props) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Contactos', icon: 'account-group' },
    { key: 'albums', title: 'Perfil', icon: 'account' },
    { key: 'recents', title: 'Lugares', icon: 'map-marker' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  const { colors } = props.theme;
  colors.primary = "#17caff";


  return (
    <PaperProvider theme={DefaultTheme}>
    <BottomNavigation style={{backgroundColor : colors.accent }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
    </PaperProvider>
  );
};

export default withTheme(MyComponent);