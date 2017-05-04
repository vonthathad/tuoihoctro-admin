import bearer from './subModules/bearer';
import local from './subModules/local.passport';

const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    Admin.findOne({
      _id: id,
    }, '-password -salt', (err, user) => {
      done(err, user);
    });
  });
  bearer(passport);
  local(passport);
};

// require('./strategies/bearer')();
// require('./strategies/facebook')();
// require('./strategies/local')();
