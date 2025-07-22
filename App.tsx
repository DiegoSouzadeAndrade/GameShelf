import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import i18n from './src/i18n';
import { PersistGate } from 'redux-persist/integration/react';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store ={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
