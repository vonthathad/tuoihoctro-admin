process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.DOMAIN = process.env.DOMAIN || 'tuoihoctro.co';
process.env.PORT = process.env.PORT || '4000';
process.env.PROTOCOL = process.env.PROTOCOL || 'http:';
process.env.CHANNEL = process.env.CHANNEL || 'www';
require('./dist/server.bundle.js');
