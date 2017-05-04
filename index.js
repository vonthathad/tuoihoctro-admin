
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.DOMAIN = process.env.DOMAIN || 'tuoihoctro.co';
process.env.PORT = process.env.PORT || '3999';
process.env.PROTOCOL = process.env.PROTOCOL || 'http:';
process.env.CHANNEL = process.env.CHANNEL || 'www';
require('babel-polyfill');
if (process.env.NODE_ENV === 'production') {
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
  require('./server/server');
}
