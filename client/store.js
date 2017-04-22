/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import promise from 'redux-promise';
import DevTools from './components/DevTools/DevTools';
import rootReducer from './redux/modules/_reducer';

export function configureStore(initialState = {}) {
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk),
    // applyMiddleware(promise),
  ];

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }
  const store = createStore(rootReducer, initialState, compose(...enhancers));

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
