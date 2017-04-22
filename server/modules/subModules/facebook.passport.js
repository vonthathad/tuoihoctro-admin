import PassportFacebook from 'passport-facebook';
const FacebookStrategy = PassportFacebook.Strategy;
import Jwt from 'jsonwebtoken';
import serverConfig from '../../configs/server.config';
import User from '../../models/user.model';
const privateKey = serverConfig.key.privateKey;
const filter = (str) => {
  let subStr = str;
  subStr = subStr.toLowerCase();
  subStr = subStr.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  subStr = subStr.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  subStr = subStr.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  subStr = subStr.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  subStr = subStr.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  subStr = subStr.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  subStr = subStr.replace(/đ/g, 'd');
  subStr = subStr.replace(/[$&+,:;=?@#|'<>.^*()%! -]/, '');
  subStr = subStr.replace(/ /g, '');
  return subStr;
};
const saveOAuthUserProfile = (req, profile, done) => {
  User.findOne({
    provider: profile.provider,
    providerId: profile.providerId,
  }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      const possibleUsername = profile.username;
      User.findUniqueUsername(possibleUsername, null,
           (availableUsername) => {
             profile.username = availableUsername;
             const user1 = new User(profile);
             user1.save((err1, user2) => {
               // console.log(err1);
               if (err1) {
                 return req.res.redirect('/login');
               }
               return done(err1, user2);
             });
           });
    } else {
      return done(err, user);
    }

    return null;
  });
};
export default (passport) => {
  passport.use(new FacebookStrategy({
    clientID: serverConfig.facebook.clientID,
    clientSecret: serverConfig.facebook.clientSecret,
    callbackURL: serverConfig.facebook.callbackURL,
    profileFields: serverConfig.facebook.profileFields,
    passReqToCallback: true,
  },
    (req, accessToken, refreshToken, profile, done) => {
      const providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;
      let username = (profile.emails) ? profile.emails[0].value.split('@')[0] : filter(profile.displayName);
      username = username.substring(0, 13);
      const email = profile.emails ? profile.emails[0].value : (`${username}@crowdbam.com`);
      const tokenData = {
        email,
      };
      const token = Jwt.sign(tokenData, privateKey);
      const providerUserProfile = {
        email,
        username,
        displayName: username,
        token,
        avatar: `http://graph.facebook.com/${profile.id}/picture?width=150&height=150`,
        isVerified: true,
        provider: 'facebook',
        providerId: profile.id,
        providerData,
      };
      if (profile.displayName) {
        providerUserProfile.displayName = profile.displayName;
      }
      saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};
