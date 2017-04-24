import mongoose from 'mongoose';
import crypto from 'crypto';
import autoIncrement from 'mongoose-auto-increment';
import serverConfig from '../configs/server.config';
const connection = mongoose.createConnection(serverConfig.mongoURL);
autoIncrement.initialize(connection);
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
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

AdminSchema.plugin(autoIncrement.plugin, {
  model: 'Admin',
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

function findAdminByEmail(email, callback) {
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

function findUniqueAdminname(username, suffix, callback) {
  // const _this = this;
  const possibleAdminname = username + (suffix || '');
  this.findOne({
    username: possibleAdminname,
  }, (err, user) => {
    if (!err) {
      if (!user) {
        callback(possibleAdminname);
      } else {
        return this.findUniqueAdminname(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
    return null;
  });
}

AdminSchema.pre('save', preSave);
AdminSchema.statics.findAdminByEmail = findAdminByEmail;
AdminSchema.methods.hashPassword = hashPassword;
AdminSchema.methods.authenticate = authenticate;
AdminSchema.statics.findUniqueAdminname = findUniqueAdminname;
export default mongoose.model('Admin', AdminSchema);
