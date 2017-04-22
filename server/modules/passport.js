import bearer from './subModules/bearer';
import facebook from './subModules/facebook.passport';
import local from './subModules/local.passport';

const mongoose = require('mongoose');
const User = mongoose.model('User');

export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id,
    }, '-password -salt', (err, user) => {
      done(err, user);
    });
  });
  bearer(passport);
  facebook(passport);
  local(passport);
};

// require('./strategies/bearer')();
// require('./strategies/facebook')();
// require('./strategies/local')();
