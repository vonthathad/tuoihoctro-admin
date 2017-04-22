/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/_App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./containers/GameList/GameList.js');
  require('./containers/GameDetail/GameDetail.js');
  require('./containers/Login/Login.js');
  require('./containers/Register/Register.js');
  require('./containers/Dashboard/Dashboard.js');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/Dashboard/Dashboard.js').default);
        });
      }}
    />
    <Route
      path="/games"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/GameList/GameList.js').default);
        });
      }}
    />
    <Route
      path="/games/:gameId"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/GameDetail/GameDetail.js').default);
        });
      }}
    />
    <Route
      path="/create-game"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/GameDetail/GameDetail.js').default);
        });
      }}
    />
    <Route
      path="/myths"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/MythList/MythList.js').default);
        });
      }}
    />
    <Route
      path="/myths/:mythId"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/MythDetail/MythDetail.js').default);
        });
      }}
    />
    <Route
      path="/create-myth"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/MythDetail/MythDetail.js').default);
        });
      }}
    />
    <Route
      path="/login"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/Login/Login.js').default);
        });
      }}
    />
    <Route
      path="/register"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/Register/Register.js').default);
        });
      }}
    />
  </Route>
);
