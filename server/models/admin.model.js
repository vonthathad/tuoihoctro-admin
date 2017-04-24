import mongoose from 'mongoose';
import crypto from 'crypto';
import autoIncrement from 'mongoose-auto-increment';
import serverConfig from '../configs/server.config';
const connection = mongoose.createConnection(serverConfig.mongoURL);
autoIncrement.initialize(connection);
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  _id: String,
  displayName: String,
  username: {
    type: String,
    unique: true,
    required: 'Username is required',
    match: [/^[A-Za-z0-9_.]{1,15}$/, 'Please fill a valid username'],
    trim: true,
  },
  email: {
    type: String,
    // match: [/.+@.+\..+/, 'Please fill a valid e-mail address'],
    required: 'Email is required',
    unique: true,
  },
  password: {
    type: String,
    validate: [
      function a(password) {
        return password && password.length > 5;
      }, 'Password should be longer',
    ],
  },
  salt: {
    type: String,
  },
  avatar: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  provider: {
    type: String,
    required: 'Provider is required',
  },
  banned: {
    type: Boolean,
    default: false,
  },
  providerId: String,
  providerData: {},
  token: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

UserSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  startAt: 1,
});


function preSave(next) {
  // console.log('presave');
  if (this.password) {
    this.salt = new
      Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
}

function findUserByEmail(email, callback) {
  this.findOne({
    email,
  }, '-password -salt', callback);
}

function hashPassword(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000,
    64, 'sha1').toString('base64');
}

function authenticate(password) {
  return this.password === this.hashPassword(password);
}

function findUniqueUsername(username, suffix, callback) {
  // const _this = this;
  const possibleUsername = username + (suffix || '');
  this.findOne({
    username: possibleUsername,
  }, (err, user) => {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
    return null;
  });
}

UserSchema.pre('save', preSave);
UserSchema.statics.findUserByEmail = findUserByEmail;
UserSchema.methods.hashPassword = hashPassword;
UserSchema.methods.authenticate = authenticate;
UserSchema.statics.findUniqueUsername = findUniqueUsername;
export default mongoose.model('User', UserSchema);
