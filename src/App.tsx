import './i18n';
import { Provider } from 'react-redux';
import { store } from './store';
import Navigation from './navigation';


function App() {

  return (
    <Provider store={store}>
        <Navigation />
    </Provider>
  );
}

export default App;
