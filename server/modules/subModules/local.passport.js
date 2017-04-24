import PassportLocal from 'passport-local';
const LocalStrategy = PassportLocal.Strategy;
import mongoose from 'mongoose';
const Admin = mongoose.model('Admin');
// import Admin from '../../models/admin.model';
export default (passport) => {
  passport.use(new LocalStrategy((email, password, done) => {
    Admin.findOne({
      email,
    }, (err, admin) => {
      if (err) {
        return done(err);
      }

      if (!admin) {
        return done(null, false, {
          message: 'Tài khoản không tồn tại',
        });
      }
      if (!admin.authenticate(password)) {
        return done(null, false, {
          message: 'Sai mật khẩu',
        });
      }
      return done(null, admin);
    });
  }));
};
