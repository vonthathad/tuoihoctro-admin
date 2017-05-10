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
// if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
require('./containers/PostList/PostList.js');
require('./containers/PostDetail/PostDetail.js');
require('./containers/AdminList/AdminList.js');
require('./containers/AdminDetail/AdminDetail.js');
require('./containers/Login/Login.js');
require('./containers/Register/Register.js');
require('./containers/Dashboard/Dashboard.js');
require('./components/Error/Error.js');
// }

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
      path="/posts"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/PostList/PostList.js').default);
        });
      }}
    />
    <Route
      path="/posts/:postId"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/PostDetail/PostDetail.js').default);
        });
      }}
    />
    <Route
      path="/create-post"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/PostDetail/PostDetail.js').default);
        });
      }}
    />
    <Route
      path="/admins"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/AdminList/AdminList.js').default);
        });
      }}
    />
    <Route
      path="/admins/:adminId"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/AdminDetail/AdminDetail.js').default);
        });
      }}
    />
    <Route
      path="/create-admin"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./containers/AdminDetail/AdminDetail.js').default);
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
    <Route
      path="/error/:httpCode"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Error/Error.js').default);
        });
      }}
    />
  </Route>
);
