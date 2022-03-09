
import { Provider as PaperProvider } from 'react-native-paper';

import WelcomeScreen from './screens/welcomeScreen/welcomeScreen';

export default function App() {
  return (
    <PaperProvider>
      <WelcomeScreen />

    </PaperProvider>
  );
}
