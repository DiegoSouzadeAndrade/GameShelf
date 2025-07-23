import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
//import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './src/navigation';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
        <Navigation />
    </Provider>
  );
}

export default App;
