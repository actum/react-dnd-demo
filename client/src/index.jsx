import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import makeStore from './store.js';
import { Provider } from 'react-redux'


export const store = makeStore();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
)
