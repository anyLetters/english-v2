import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/AppContainer.js';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import style from './App.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./App.js', () => {
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('root')
    )})
}

registerServiceWorker();
