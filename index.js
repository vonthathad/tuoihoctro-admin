/**
 * Entry Script
 */


process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.DOMAIN = process.env.DOMAIN || 'tuoihoctro.co';
process.env.PORT = process.env.PORT || '4000';
process.env.PROTOCOL = process.env.PROTOCOL || 'http:';
process.env.CHANNEL = process.env.CHANNEL || 'www';

if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('./dist/manifest.json'));
  process.env.webpackChunkAssets = JSON.stringify(require('./dist/chunk-manifest.json'));
  // In production, serve the webpacked server file.
  require('./dist/server.bundle.js');
} else {
  // Babel polyfill to convert ES6 code in runtime
  require('babel-register')({
    "plugins": [
      [
        "babel-plugin-webpack-loaders",
        {
          "config": "./webpack.config.babel.js",
          "verbose": false
        }
      ]
    ]
  });
  require('babel-polyfill');
  require('./server/server');
}
