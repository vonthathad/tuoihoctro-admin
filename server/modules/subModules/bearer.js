const BearerStrategy = require('passport-http-bearer').Strategy;
import serverConfig from '../../configs/server.config';
const Jwt = require('jsonwebtoken');
import Admin from '../../models/admin.model';
const privateKey = serverConfig.key.privateKey;
export default (passport) => {
  passport.use(new BearerStrategy({}, (token, done) => {
    if (token === serverConfig.token.guest) {
      return done(null, 'guest');
    }
    Jwt.verify(token, privateKey, (err, decoded) => {
      if (decoded === undefined) {
        return done(null, false);
      }
      // console.log(decoded.email);
      Admin.findAdminByEmail(decoded.email, (err1, admin) => {
        return !admin ? done(null, false) : done(null, admin);
      });
      return null;
    });
    return null;
  }));
};
