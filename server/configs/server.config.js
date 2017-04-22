/**
 * Created by andh on 9/15/16.
 */
// module.exports = require(`./env/${process.env.NODE_ENV}.js`);
import development from './env/development';
import production from './env/production';

const config = {};
if (process.env.NODE_ENV === 'production') {
  config.env = production;
} else {
  config.env = development;
}
const serverConfig = config.env;
export default serverConfig;
