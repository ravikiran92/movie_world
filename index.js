/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { store } from './src/Redux/Store';
import { Provider } from 'react-redux';

AppRegistry.registerComponent(appName, () => wrapper);

const wrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}