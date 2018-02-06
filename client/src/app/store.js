import { createStore } from 'redux';
import reducer from './reducer';

/* eslint no-underscore-dangle: 0 */
const makeStore = () => createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default makeStore;
