/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _development = __webpack_require__(18);

var _development2 = _interopRequireDefault(_development);

var _production = __webpack_require__(19);

var _production2 = _interopRequireDefault(_production);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by andh on 9/15/16.
 */
// module.exports = require(`./env/${process.env.NODE_ENV}.js`);
var config = {};
if (process.env.NODE_ENV === 'production') {
  config.env = _production2.default;
} else {
  config.env = _development2.default;
}
var serverConfig = config.env;
exports.default = serverConfig;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authLogout = authLogout;
exports.login = login;
exports.register = register;
exports.verifyEmail = verifyEmail;
exports.resetPage = resetPage;
exports.renderPassword = renderPassword;
exports.resetDone = resetDone;
exports.resendVerificationEmail = resendVerificationEmail;
exports.resetPassword = resetPassword;
exports.authToken = authToken;
exports.get = get;
exports.update = update;
exports.remove = remove;
exports.adminByAdminname = adminByAdminname;
exports.requiresLogin = requiresLogin;
exports.requiresManager = requiresManager;
exports.requiresAdmin = requiresAdmin;
exports.isBanned = isBanned;
exports.listAdmins = listAdmins;
exports.adminByID = adminByID;
exports.create = create;

var _admin = __webpack_require__(5);

var _admin2 = _interopRequireDefault(_admin);

var _jsonwebtoken = __webpack_require__(7);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mail = __webpack_require__(20);

var _mail2 = _interopRequireDefault(_mail);

var _server = __webpack_require__(0);

var _server2 = _interopRequireDefault(_server);

var _passport = __webpack_require__(3);

var _passport2 = _interopRequireDefault(_passport);

var _crypto = __webpack_require__(6);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by andh on 8/4/16.
 */
var npp = 6;

var privateKey = _server2.default.key.privateKey;
// const https from'https');

var getErrorMessage = function getErrorMessage(err) {
  var messages = [];
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        messages = ['Email or username is exist'];
        break;
      default:
        break;
    }
  } else {
    console.log(err.errors);
    // for (const errName of err.errors) {
    //   err.errors[errName].message && messages.push(err.errors[errName].message);
    // }
  }
  return messages;
};
function authLogout(req, res) {
  req.logout();
  res.redirect('/');
}
function login(req, res, next) {
  _passport2.default.authenticate('local', function (err, admin, info) {
    if (err) {
      return next(err);
    }
    if (!admin) {
      return res.status(404).send({ error: info.message });
    }
    res.status(200).send({ data: admin });
    return null;
  })(req, res, next);
}
function register(req, res) {
  if (!req.admin) {
    var admin = new _admin2.default();
    admin.email = req.body.email;
    admin.username = req.body.username;
    admin.password = req.body.password;
    admin.role = 1;
    admin.banned = true;
    admin.provider = 'local';
    admin.avatar = '/images/avatar.png';
    admin.created = new Date();
    var tokenDt = {
      email: req.body.email
    };
    admin.token = _jsonwebtoken2.default.sign(tokenDt, privateKey);
    admin.save(function (err, result) {
      if (err) {
        var messages = getErrorMessage(err);
        return res.status(400).send({
          messages: messages
        });
      }
      // const tokenData = {
      //   email: admin.email,
      // };
      // Mail.sentMailVerificationLink(admin, Jwt.sign(tokenData, privateKey));
      // message = "Hãy kiểm tra email của bạn để xác nhận tài khoản";
      // req.flash('error', message);
      //   console.log(123);

      return res.status(200).send({
        token: result.token,
        message: 'Hãy kiểm tra email của bạn để xác nhận tài khoản'
      });
    });
  } else {
    return res.redirect('/');
  }
  return null;
}

function verifyEmail(req, res) {
  var token = req.params.token;
  //   const app = {
  //     id: config.app.id,
  //     name: config.app.name,
  //     description: config.app.description,
  //     url: config.app.url,
  //     image: config.app.image,
  //   };
  _jsonwebtoken2.default.verify(token, privateKey, function (err, decoded) {
    if (decoded === undefined) {
      var message = 'Token has expired :(';
      return res.render('index', { message: message, app: _server2.default.app, channel: _server2.default.server.channel });
    }
    _admin2.default.findOne({ email: decoded.email }, function (err1, admin) {
      if (err1) {
        var _message = 'Token has expired :(';
        return res.render('index', { message: _message, app: _server2.default.app, channel: _server2.default.server.channel });
      }
      if (admin === null) {
        var _message2 = "Account doesn't exist";
        return res.render('index', { message: _message2, app: _server2.default.app, channel: _server2.default.server.channel });
      }
      admin.isVerified = true;
      admin.save(function (err2) {
        if (err2) {
          var _message3 = 'Error Occur. Please try again';
          return res.render('index', { message: _message3, app: _server2.default.app, channel: _server2.default.server.channel });
        }
        var message = 'Congragulation! Account has verified';
        return res.render('index', { message: message, app: _server2.default.app, channel: _server2.default.server.channel });
      });
      return null;
    });
    return null;
  });
}
function resetPage(req, res) {
  _admin2.default.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, admin) {
    if (!admin) {
      //   const app = {
      //     id: config.app.id,
      //     name: config.app.name,
      //     description: config.app.description,
      //     url: config.app.url,
      //     image: config.app.image,
      //   };
      var message = 'Token has expired :(';
      return res.render('index', { message: message, admin: null, app: _server2.default.app, channel: _server2.default.server.channel });
    }
    return res.redirect('/action/password/' + req.params.token);
  });
}
function renderPassword(req, res) {
  _admin2.default.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, admin) {
    if (!admin) {
      //   const app = {
      //     id: config.app.id,
      //     name: config.app.name,
      //     description: config.app.description,
      //     url: config.app.url,
      //     image: config.app.image,
      //   };
      var _message4 = 'Token has expired :(';
      return res.render('index', { message: _message4, admin: null, app: _server2.default.app, channel: _server2.default.server.channel });
    }
    var message = 'Enter new password';
    return res.render('index', { message: message, admin: null, app: _server2.default.app, channel: _server2.default.server.channel });
  });
}
function resetDone(req, res) {
  _admin2.default.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, admin) {
    if (!admin) {
      // req.flash('error', 'Token để reset password không tồn tại, hoặc đã hết hạn.');
      // return res.redirect('back');
      var message = 'Token has expired :(';
      return res.status(400).send({
        message: message
      });
    }
    // console.log(req.body.password);
    admin.password = req.body.password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    admin.save(function (err1) {
      if (err1) {
        var _message5 = 'Error occur. Please try again';
        return res.status(400).send({
          message: _message5
        });
      }
      _mail2.default.sendMailDoneResetPassword(admin);
      var message = 'Change password success!';
      return res.status(200).send({
        data: admin,
        message: message
      });
    });
    return null;
  });
}
function resendVerificationEmail(req, res) {
  _admin2.default.findAdminByEmail(req.body.email, function (err, admin) {
    if (!err) {
      if (admin === null) {
        var _message7 = "Account doesn't exist";
        return res.status(400).send({
          message: _message7
        });
      }
      if (admin.isVerified === true) {
        var _message8 = 'Account has verified';
        return res.status(400).send({
          message: _message8
        });
      }
      var tokenData = {
        email: admin.email
      };
      _mail2.default.sentMailVerificationLink(admin, _jsonwebtoken2.default.sign(tokenData, privateKey));
      var _message6 = 'Resend confirmation email success. Check your email to verify!';
      return res.status(200).send({
        message: _message6
      });
    }
    var message = 'Error occur. Please try again.';
    return res.status(400).send({
      message: message
    });
  });
}
function resetPassword(req, res) {
  _admin2.default.findOne({ email: req.body.email }, function (err, admin) {
    if (!err) {
      if (admin === null) {
        var message = 'Tài khoản không tồn tại';
        return res.status(400).send({
          message: message
        });
      }
      _crypto2.default.randomBytes(20, function (err1, buf) {
        if (err1) {
          var _message9 = 'Error occur. Please try again';
          return res.status(400).send({
            message: _message9
          });
        }
        var token = buf.toString('hex');
        admin.resetPasswordToken = token;
        admin.resetPasswordExpires = Date.now() + 3600000;
        admin.save(function (err2) {
          if (err2) {
            var _message10 = 'Error occur. Please try again';
            return res.status(400).send({
              message: _message10
            });
          }
          _mail2.default.sendMailResetPassword(admin, token);
          var message = 'Success. Password change request has been sent to your email';
          return res.status(200).send({
            message: message
          });
        });
        return null;
      });
    } else {
      var _message11 = 'Error occur. Please try again';
      return res.status(400).send({
        message: _message11
      });
    }
    return null;
  });
}

var getSortType = function getSortType(sortType) {
  if (sortType === 'username') {
    return { username: -1 };
  }
  if (sortType === 'exp') {
    return { exp: -1 };
  }
  return { created: -1 };
};

// ////////////////////////////////////////////////
// //GET USER DATA, Header Authorization By Token
// ////////////////////////////////////////////////
function authToken(req, res) {
  if (req.admin) {
    req.admin.save();
    return res.json({ admin: req.admin });
  }
  res.status(400).send();
  return null;
}
function get(req, res) {
  res.status(200).send({ message: 'OK', data: req.selectedAdmin });
}

function update(req, res) {
  // console.log(req.body);
  if (req.body.avatar) req.selectedAdmin.avatar = req.body.avatar;
  // if (req.body.username) dataChange.username = req.body.username;
  if (req.body.displayName) req.selectedAdmin.displayName = req.body.displayName;
  _admin2.default.findOneAndUpdate({ _id: req.selectedAdmin._id }, req.body, '-password -salt -token -isVerified -providerData').exec(function (err, admin) {
    if (err) {
      return res.status(400).send({ message: err });
    }
    return res.status(200).send({ message: 'OK', data: admin });
  });
}
function remove(req, res) {
  _admin2.default.findByIdAndRemove(req.selectedAdmin._id).exec(function (err, admin) {
    if (err) {
      return res.status(400).send({ message: err });
    }
    return res.json(admin);
  });
}
function adminByAdminname(req, res, next, id) {
  _admin2.default.findOne({ username: id }, '-password -salt -token -isVerified -providerData').exec(function (err, admin) {
    if (err) {
      return res.status(500).json({ message: 'Lỗi server' });
    }
    if (!admin) {
      return res.status(400).json({ message: 'Không tim thấy admin' });
    }
    req.selectedAdmin = admin;
    next();
    return null;
  });
  return null;
}

function requiresLogin(req, res, next) {
  if (req.admin === 'guest' || !req.isAuthenticated()) {
    return res.status(401).send({
      message: "Admin doesn't login"
    });
  } else if (req.admin === 'ban') {
    return res.status(403).send({
      message: 'Your account is banned'
    });
  }
  next();
  return null;
}
function requiresManager(req, res, next) {
  if (req.admin.role === 'manager' || req.admin.role === 'admin') {
    next();
  } else {
    return res.status(403).send({
      message: "You doesn't have a permission"
    });
  }
  return null;
}

function requiresAdmin(req, res, next) {
  if (req.admin.role === 'admin') {
    next();
  } else {
    return res.status(403).send({
      message: "You doesn't have a permission"
    });
  }
  return null;
}
function isBanned(req, res, next) {
  if (req.admin.banned) {
    return res.status(403).send({
      message: 'Nick của bạn đã bị banned'
    });
  }
  next();
  return null;
}

function listAdmins(req, res) {
  var paging = parseInt(req.query.paging, 10) || npp;
  //   console.log('paging', paging);
  var page = parseInt(req.query.page, 10) || 1;
  var skip = page > 0 ? (page - 1) * paging : 0;
  var conds = [];
  var match = {};
  if (req.query.banned) {
    conds.push({ banned: req.query.banned });
  }
  if (!conds.length) {
    match = {};
  } else if (conds.length === 1) {
    match = conds.pop();
  } else {
    match = { $and: conds };
  }
  //   console.log(match);
  var sortType = getSortType(req.query.order);
  _admin2.default.aggregate([{
    $match: { $and: [match] }
  }, {
    $project: {
      created: 1,
      username: 1,
      avatar: 1,
      email: 1,
      role: 1,
      banned: 1
    }
  },
  // Sorting pipeline
  { $sort: sortType }, { $skip: skip },
  // Optionally limit results
  { $limit: paging }], function (err, results) {
    if (err) {
      return res.status(400).send();
    }
    if (results.length === 0) {
      return res.status(404).send();
    }
    return res.json({ data: results });
  });
}

function adminByID(req, res, next, id) {
  _admin2.default.findById(id).select('_id username email created banned role').exec(function (err, admin) {
    if (err) {
      // console.log(1);
      return res.status(400).send();
    }
    if (!admin) {
      return res.status(400).send({
        messages: ['Failed to load admin ' + id]
      });
    }
    req.selectedAdmin = admin;
    next();
    return null;
  });
  return null;
}

exports.count = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _admin2.default.count({}, function (err, count) {
              if (err) return res.status(500).send();
              return res.status(200).send({ message: 'OK', data: count });
            });

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function create(req, res) {
  var admin = new _admin2.default();
  admin.email = req.body.email;
  admin.username = req.body.username;
  admin.password = req.body.password;
  admin.role = req.body.role;
  admin.banned = req.body.banned;
  admin.provider = 'local';
  admin.avatar = '/images/avatar.png';
  admin.created = new Date();
  var tokenDt = {
    email: req.body.email
  };
  admin.token = _jsonwebtoken2.default.sign(tokenDt, privateKey);
  admin.save(function (err, addedAdmin) {
    if (err) return res.status(500).send();
    return res.status(200).send({ message: 'OK', data: addedAdmin });
  });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = __webpack_require__(6);

var _crypto2 = _interopRequireDefault(_crypto);

var _mongooseAutoIncrement = __webpack_require__(8);

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

var _server = __webpack_require__(0);

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = _mongoose2.default.createConnection(_server2.default.mongoURL);
_mongooseAutoIncrement2.default.initialize(connection);
var Schema = _mongoose2.default.Schema;
var AdminSchema = new Schema({
  _id: String,
  username: {
    type: String,
    unique: true,
    required: 'Username is required',
    match: [/^[A-Za-z0-9_.]{1,15}$/, 'Please fill a valid username'],
    trim: true
  },
  email: {
    type: String,
    // match: [/.+@.+\..+/, 'Please fill a valid e-mail address'],
    required: 'Email is required',
    unique: true
  },
  password: {
    type: String,
    validate: [function a(password) {
      return password && password.length > 5;
    }, 'Password should be longer']
  },
  salt: {
    type: String
  },
  avatar: String,
  role: {
    type: Number,
    default: 1
  },
  created: {
    type: Date,
    default: new Date()
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  banned: {
    type: Boolean,
    default: false
  },
  providerId: String,
  providerData: {},
  token: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

AdminSchema.plugin(_mongooseAutoIncrement2.default.plugin, {
  model: 'Admin',
  startAt: 1
});

function preSave(next) {
  if (this.password) {
    this.salt = new Buffer(_crypto2.default.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password, this.salt);
  }
  next();
}
function hashPassword(password, salt) {
  return _crypto2.default.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
}
function preUpdate(next) {
  this.getUpdate().salt = new Buffer(_crypto2.default.randomBytes(16).toString('base64'), 'base64');
  this.getUpdate().password = hashPassword(this.getUpdate().password, this.getUpdate().salt.toString());
  next();
}
function findAdminByEmail(email, callback) {
  this.findOne({
    email: email
  }, '-password -salt', callback);
}

function authenticate(password, salt) {
  return this.password === this.hashPassword(password, salt);
}

function findUniqueAdminname(username, suffix, callback) {
  var _this = this;

  // const _this = this;
  var possibleAdminname = username + (suffix || '');
  this.findOne({
    username: possibleAdminname
  }, function (err, user) {
    if (!err) {
      if (!user) {
        callback(possibleAdminname);
      } else {
        return _this.findUniqueAdminname(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
    return null;
  });
}

AdminSchema.pre('save', preSave);
AdminSchema.pre('findOneAndUpdate', preUpdate);
AdminSchema.statics.findAdminByEmail = findAdminByEmail;
AdminSchema.methods.hashPassword = hashPassword;
AdminSchema.methods.authenticate = authenticate;
AdminSchema.statics.findUniqueAdminname = findUniqueAdminname;
exports.default = _mongoose2.default.model('Admin', AdminSchema);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("mongoose-auto-increment");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = __webpack_require__(0);

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const mongoose = require('mongoose');

exports.default = function (mongoose, callback) {
  // Set native promises as mongoose promise
  mongoose.Promise = global.Promise;

  var db = mongoose.connect(_server2.default.mongoURL, { server: { auto_reconnect: true } });
  // console.log(config.database);
  var dbc = mongoose.connection;
  // dbc.on('error', console.error.bind(console, 'connection error:'));
  // dbc.once('open', () =>  {
  //     console.log("DB connect successfully!");
  //     callback();
  // });

  dbc.on('connecting', function () {
    // console.log('connecting to MongoDB...');
  });

  dbc.on('error', function () {
    // console.error(`Error in MongoDb connection: ${error}`);
    mongoose.disconnect();
  });
  dbc.on('connected', function () {
    // console.log('MongoDB connected!');
  });
  dbc.once('open', function () {
    // console.log('MongoDB connection opened!');
    callback();
  });
  dbc.on('reconnected', function () {
    // console.log('MongoDB reconnected!');
  });
  dbc.on('disconnected', function () {
    // console.log('MongoDB disconnected!');
    // mongoose.connect(serverConfig.database, { server: { auto_reconnect: true } });
  });

  return db;
};
// require('../models/user.model');
// require('../models/category.model');
// require('../models/content.model');
// require('../models/comment.model');

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bearer = __webpack_require__(23);

var _bearer2 = _interopRequireDefault(_bearer);

var _local = __webpack_require__(24);

var _local2 = _interopRequireDefault(_local);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = __webpack_require__(1);
var Admin = mongoose.model('Admin');

exports.default = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    Admin.findOne({
      _id: id
    }, '-password -salt', function (err, user) {
      done(err, user);
    });
  });
  (0, _bearer2.default)(passport);
  (0, _local2.default)(passport);
};

// require('./strategies/bearer')();
// require('./strategies/facebook')();
// require('./strategies/local')();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(2);

var _passport = __webpack_require__(3);

var _passport2 = _interopRequireDefault(_passport);

var _admin = __webpack_require__(4);

var admins = _interopRequireWildcard(_admin);

var _post = __webpack_require__(21);

var posts = _interopRequireWildcard(_post);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

// router.use(passport.authenticate('bearer', { session: false }), admins.isBanned);
/* TOKEN */
router.get('/token', admins.authToken);

// ////////// POST
router.post('/admins', admins.create).get('/admins', admins.listAdmins);
router.get('/admins-count', admins.count);
router.route('/admins/:adminID').get(admins.get).put(admins.update).delete(admins.requiresLogin, admins.remove);
router.param('adminID', admins.adminByID);

// ////////// POST
router.post('/posts', posts.create).get('/posts', posts.listPosts);
router.get('/posts-count', posts.count);
router.post('/gif2mp4', posts.gif2mp4);
router.route('/posts/:postID').get(posts.get).put(posts.update).delete(admins.requiresLogin, posts.remove);
router.param('postID', posts.postByID);

exports.default = router;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(2);

var _admin = __webpack_require__(4);

var admins = _interopRequireWildcard(_admin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

// ///////// LOCAL REGISTER
router.post('/register-admin', admins.register);

// ///////// LOCAL LOGIN
router.post('/login-admin', admins.login);

// ///////// LOGOUT
router.get('/logout-admin', admins.authLogout);

exports.default = router;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var development = {
  // mongoURL: 'mongodb://admin:tht2017PCMG@23.88.239.10:61511/tuoihoctro',
  // mongoURL: 'mongodb://dbadmin:thtdbadmin@45.76.151.211:63547/tht',
  mongoURL: 'mongodb://localhost:27017/tht',
  key: {
    privateKey: 'PRIVATEKEYGOESHERE',
    tokenExpiry: 30 * 1000 * 60 },
  token: {
    guest: 'CRzytqL1lv1o8FaogFa2S4MyYU4F6Z9D'
  },
  facebook: {
    clientID: '1559166841054175',
    clientSecret: '036522e3d958646273f13b3f9ffce3cd',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email', 'gender']
  },
  google: {
    clientID: '844189525883-op8r9biu0u8rotve147erv08dsmv3fr6.apps.googleusercontent.com',
    clientSecret: 'cNztTZyza-QkaijXejKP2lRj',
    callbackURL: '/auth/google/callback',
    profileFields: ['id', 'displayName', 'email', 'gender']
  },
  email: {
    username: 'crowdbam.system',
    password: 'crowdbam@sgp',
    accountName: 'Crowd Bam',
    verifyEmailUrl: 'action/verify',
    resetPasswordUrl: 'action/reset'
  },
  host: 'http://localhost:' + process.env.PORT,
  port: process.env.PORT,
  channel: process.env.CHANNEL,
  app: {
    id: '170584416691811',
    name: 'Title',
    description: 'Description',
    url: process.env.PROTOCOL + '//' + process.env.CHANNEL + '.' + process.env.DOMAIN,
    image: process.env.PROTOCOL + '//' + process.env.CHANNEL + '.' + process.env.DOMAIN + '/sources/ads.jpg'
  }
};
exports.default = development;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var production = {
  //    mongoURL: 'mongodb://admin:tht2017PCMG@23.88.239.10:61511/tuoihoctro',
  mongoURL: 'mongodb://dbadmin:thtdbadmin@45.76.151.211:63547/tht',
  // mongoURL: 'mongodb://localhost:27017/tht',
  key: {
    privateKey: 'PRIVATEKEYGOESHERE',
    tokenExpiry: 30 * 1000 * 60 },
  token: {
    guest: 'CRzytqL1lv1o8FaogFa2S4MyYU4F6Z9D'
  },
  facebook: {
    clientID: '1559166841054175',
    clientSecret: '036522e3d958646273f13b3f9ffce3cd',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email', 'gender']
  },
  email: {
    username: 'crowdbam.com',
    password: 'crowdbam123',
    accountName: 'Crowd Bam',
    verifyEmailUrl: 'action/verify',
    resetPasswordUrl: 'action/reset'
  },
  host: process.env.PROTOCOL + '//' + process.env.DOMAIN,
  port: process.env.PORT,
  app: {
    id: '170584416691811',
    name: 'Title',
    description: 'Description',
    url: process.env.PROTOCOL + '//' + process.env.DOMAIN,
    image: process.env.PROTOCOL + '//' + process.env.DOMAIN + '/sources/ads.jpg'
  }
};
exports.default = production;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// /**
//  * Created by 15R on 2/5/2016.
//  */
// import nodemailer from 'nodemailer';
// import serverConfig from './server.config';
// // const privateKey = serverConfig.key.privateKey;
// // console.log(serverConfig.server.host);
// // create reusable transport method (opens pool of SMTP connections)
// const smtpTransport = nodemailer.createTransport(`smtps://${serverConfig.email.username}%40gmail.com:${serverConfig.email.password}@smtp.gmail.com`);
//
//
// const mail = (mailOptions) => {
//   smtpTransport.sendMail(mailOptions, () => {
//     // if (error) {
//     //   console.error(error);
//     // }
//     // console.log(response);
//     smtpTransport.close(); // shut down the connection pool, no more messages
//   });
// };
//
// exports.sentMailVerificationLink = (user, token) => {
//   const _from = `${serverConfig.email.accountName} <${serverConfig.email.username}@gmail.com>'`;
//   let mailbody = `<p>Thank you for registering at${serverConfig.email.accountName}</p>`;
//   mailbody += `<p>Please confirm your account at this link:<br/><a href='${serverConfig.server.host$}/${serverConfig.email.verifyEmailUrl}/${token}'>Verify Link</a></p>`;
//
//   const mailOptions = {
//     from: _from, // sender address
//     to: user.email, // list of receivers
//     subject: 'Verify account at www.crowdbam.com', // Subject line
//     // text: result.price, // plaintext body
//     html: mailbody,  // html body
//   };
//   mail(mailOptions);
// };
// exports.sendMailResetPassword = (user, token) => {
//   const _from = `${serverConfig.email.accountName} <${serverConfig.email.username}@gmail.com>`;
//   let mailbody = '<p>You are receiving this email because you (or someone else) required to be reset your password.</p>';
//   mailbody += `<p>Please click this link to excute:<br/><a href='${serverConfig.server.host}/${serverConfig.email.resetPasswordUrl}/${token}>Link Reset Password</a></p>`;
//   mailbody += '<p>If you did not request this, please ignore the email and password will remain the same.</p>';
//   const mailOptions = {
//     from: _from, // sender address
//     to: user.email, // list of receivers
//     subject: 'Change password at www.crowdbam.com', // Subject line
//     // text: result.price, // plaintext body
//     html: mailbody,  // html body
//   };
//   mail(mailOptions);
// };
// exports.sendMailDoneResetPassword = (user) => {
//   const _from = `${serverConfig.email.accountName} <${serverConfig.email.username}@gmail.com>`;
//   const mailbody = `<p>This is the email to confirm that the account ${user.username} has changed password.</p>`;
//   const mailOptions = {
//     from: _from, // sender address
//     to: user.email, // list of receivers
//     subject: 'Change password done at www.crowdbam.com', // Subject line
//     // text: result.price, // plaintext body
//     html: mailbody,  // html body
//   };
//   mail(mailOptions);
// };
//


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _post = __webpack_require__(22);

var _post2 = _interopRequireDefault(_post);

var _fsExtra = __webpack_require__(28);

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _fluentFfmpeg = __webpack_require__(27);

var _fluentFfmpeg2 = _interopRequireDefault(_fluentFfmpeg);

var _child_process = __webpack_require__(26);

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by andh on 1/29/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var npp = 6;


var storeDir = __dirname + '/../../../tuoihoctro.co/public/posts_data/';

exports.hasAuthorization = function (req, res, next) {
  if (req.post.creator._id !== parseInt(req.user._id, 10) && req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(403).send({ messages: ["You aren't Creator"] });
  }
  next();
  return null;
};
exports.listPosts = function (req, res) {
  var paging = parseInt(req.query.paging, 10) || npp;
  // console.log('paging', paging);
  var page = parseInt(req.query.page, 10) || 1;
  var skip = page > 0 ? (page - 1) * paging : 0;
  var conds = [];
  if (!req.query.user || parseInt(req.query.user, 10) !== req.user._id) {
    if (req.query.review) {
      conds.push({ review: true });
    } else {
      conds.push({ publish: true });
    }
  }
  req.query.category && conds.push({ categories: req.query.category });
  if (req.query.recommendations && req.user._id) {
    if (req.user.recommendations) {
      var cateList = [];
      req.user.recommendations.forEach(function (recommendation) {
        cateList.push({ categories: recommendation });
      });
      if (cateList.length) {
        conds.push({ $or: cateList });
      }
    }
  }
  req.query.user && conds.push({ creator: parseInt(req.query.user, 10) });
  req.query.text && conds.push({
    $or: [{ title: { $regex: req.query.text, $options: 'i' } }, { description: { $regex: req.query.text, $options: 'i' } }]
  });
  conds.push({ processed: true });
  var match = null;
  if (!conds.length) match = {};else if (conds.length === 1) match = conds.pop();else match = { $and: conds };
  // https://medium.com/hacking-and-gonzo/how-reddit-ranking-algorithms-work-ef111
  // e33d0d9#.hkka5wx3i
  var project = {
    title: 1, type: 1, categories: 1,
    mediaContent: 1, mediaContentLQ: 1, mediaContentHeight: 1, mediaContentWidth: 1,
    thumb: 1, thumbLQ: 1, thumbHeight: 1, thumbWidth: 1,
    smallThumb: 1, smallThumbLQ: 1, smallThumbHeight: 1, smallThumbWidth: 1,
    created: 1, description: 1, shares: 1, follows: 1, view: 1, votes: 1, point: 1, creator: 1
  };
  _post2.default.aggregate([{ $match: match }, { $project: project }, { $sort: { created: -1 } }, { $skip: skip }, { $limit: paging }], function (err, results) {
    if (err) return res.status(400).send();
    if (results.length === 0) return res.status(404).send();
    return res.json({ data: results });
  });
  return null;
};

var checkExist = function checkExist(path) {
  return new Promise(function (resolve) {
    _fsExtra2.default.exists(path, function (exists) {
      resolve(exists);
    });
  });
};
function writeFileFromByte64(path, base64Data) {
  return new Promise(function (resolve, reject) {
    _fsExtra2.default.writeFile(path, base64Data, 'base64', function (err) {
      if (err) {
        reject({ code: 500, err: err });return;
      }
      resolve();
    });
  });
}
function findLatestPost() {
  return new Promise(function (resolve, reject) {
    _post2.default.findOne({}, {}, { sort: { _id: -1 } }, function (err, latestPost) {
      if (err) {
        reject({ code: 500, err: err });return;
      }
      // if (!latestPost) { reject({ code: 404, err }); return; }
      resolve(latestPost);
    });
  });
}
function cloneResize15(inputPath, outputPath) {
  return new Promise(function (resolve, reject) {
    _child_process2.default.exec('convert ' + inputPath + ' -resize 15%  ' + outputPath, function (err) {
      if (err) {
        reject({ code: 500, err: err });return;
      }
      resolve();
    });
  });
}

var compressJPG = function compressJPG(inputPath) {
  return new Promise(function (resolve, reject) {
    _child_process2.default.exec('jpegoptim --max=55 -s ' + inputPath + ' ', function (err) {
      if (err) {
        reject({ code: 500, err: err });return;
      }
      resolve();
    });
  });
};
var optiMp4 = function optiMp4(inputPath) {
  return new Promise(function (resolve, reject) {
    _child_process2.default.exec('ffmpeg -i ' + inputPath + ' -movflags faststart -acodec copy -vcodec copy ' + inputPath + ' -y ', function (err) {
      if (err) {
        reject({ code: 500, err: err });return;
      }
      resolve();
    });
  });
};
var createFolder = function createFolder(path) {
  return new Promise(function (resolve, reject) {
    _child_process2.default.exec('mkdir ' + path + ' ', function (err) {
      if (err) {
        reject({ code: 500, err: err });return;
      }
      resolve();
    });
  });
};
var getImgHeight = function getImgHeight(path) {
  return new Promise(function (resolve, reject) {
    _child_process2.default.exec('identify -format "%[fx:h]"  ' + path + ' ', function (err, stdout) {
      if (err) {
        reject({ code: 500, err: err });return;
      }
      resolve(stdout);
    });
  });
};
var resizeMp4 = function resizeMp4(path) {
  return new Promise(function (resolve, reject) {
    var tempPath = path.split('.mp4')[0] + 'x.mp4';
    _child_process2.default.exec('ffmpeg -i ' + path + ' -vf scale=600:-1 ' + tempPath + ' -y && mv ' + tempPath + ' ' + path, function (err, stdout) {
      if (err) {
        reject({ code: 500, err: err });return;
      }
      resolve(stdout);
    });
  });
};
var addWM2Img = function addWM2Img(path, WMPath) {
  return new Promise(function (resolve, reject) {
    _child_process2.default.exec('composite -gravity south ' + WMPath + ' ' + path + ' ' + path, function (err, stdout) {
      if (err) {
        reject({ code: 500, err: err });return;
      }
      resolve(stdout);
    });
  });
};
var addWM2Mp4 = function addWM2Mp4(path, WMPath) {
  return new Promise(function (resolve, reject) {
    var tempPath = path.split('.mp4')[0] + 'x.mp4';
    _child_process2.default.exec('ffmpeg -i ' + path + ' -i ' + WMPath + ' -filter_complex "overlay=main_w/2-overlay_w/2:main_h-overlay_h" ' + tempPath + ' -y && mv ' + tempPath + ' ' + path, function (err, stdout) {
      if (err) {
        reject({ code: 500, err: err });return;
      }
      resolve(stdout);
    });
  });
};

var removeF = function removeF(path) {
  return new Promise(function (resolve, reject) {
    _fsExtra2.default.remove(path, function (err) {
      err && reject({ code: 500, err: err });
      resolve();
    });
  });
};

var addPost = function addPost(data) {
  return new Promise(function (resolve, reject) {
    new _post2.default(data).save(function (err, addedPost) {
      err && reject({ code: 500, err: err });
      resolve(addedPost);
    });
  });
};
var updatePostById = function updatePostById(data) {
  return new Promise(function (resolve, reject) {
    _post2.default.findByIdAndUpdate(data._id, data, function (err, addedPost) {
      err && reject({ code: 500, err: err });
      resolve(addedPost);
    });
  });
};
function requestOK(res, data) {
  return new Promise(function (resolve) {
    res.status(200).send({ message: 'OK', data: data });
    resolve();
  });
}
exports.create = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var post, latestPost, newId, basePath, isGif, media64, mediaPath, mediaWMPath, mediaResizePath, mh, th, thumb64, thumbPath, thumbWMPath, thumbResizePath, recommend64, recommendPath, recommendWMPath, recommendResizePath, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            post = req.body;
            // const baseUrl = 'http://localhost:4000/';

            _context.next = 3;
            return findLatestPost();

          case 3:
            latestPost = _context.sent;
            newId = latestPost ? latestPost._id + 1 : 0;
            _context.next = 7;
            return addPost({ _id: newId, title: 'f' });

          case 7:
            basePath = '' + storeDir + newId + '/';
            _context.next = 10;
            return removeF(basePath);

          case 10:
            _context.prev = 10;
            _context.next = 13;
            return createFolder(basePath);

          case 13:
            isGif = post.type === 1;
            media64 = post.mediaSrc.replace(/^data:(video|image)\/(jpeg|mp4);base64,/, '');
            mediaPath = '' + basePath + newId + '_m.' + (isGif ? 'mp4' : 'jpeg');
            mediaWMPath = basePath + '../_wm/wm_m.png';
            _context.next = 19;
            return writeFileFromByte64(mediaPath, media64);

          case 19:
            if (isGif) {
              _context.next = 31;
              break;
            }

            mediaResizePath = '' + basePath + newId + '_mr.jpeg';
            _context.next = 23;
            return addWM2Img(mediaPath, mediaWMPath);

          case 23:
            _context.next = 25;
            return cloneResize15(mediaPath, mediaResizePath);

          case 25:
            _context.next = 27;
            return compressJPG(mediaPath);

          case 27:
            _context.next = 29;
            return compressJPG(mediaResizePath);

          case 29:
            _context.next = 35;
            break;

          case 31:
            _context.next = 33;
            return resizeMp4(mediaPath);

          case 33:
            _context.next = 35;
            return addWM2Mp4(mediaPath, mediaWMPath);

          case 35:
            if (isGif) {
              _context.next = 41;
              break;
            }

            _context.next = 38;
            return getImgHeight(mediaPath);

          case 38:
            _context.t0 = _context.sent;
            _context.next = 42;
            break;

          case 41:
            _context.t0 = 0;

          case 42:
            mh = _context.t0;
            th = 0;

            if (!(post.thumbSrc && post.thumbSrc !== 'empty')) {
              _context.next = 62;
              break;
            }

            thumb64 = post.thumbSrc.replace(/^data:image\/jpeg;base64,/, '');
            thumbPath = '' + basePath + newId + '_t.jpeg';
            thumbWMPath = basePath + '../_wm/wm_t.png';
            thumbResizePath = '' + basePath + newId + '_tr.jpeg';
            _context.next = 51;
            return writeFileFromByte64(thumbPath, thumb64);

          case 51:
            _context.next = 53;
            return addWM2Img(thumbPath, thumbWMPath);

          case 53:
            _context.next = 55;
            return cloneResize15(thumbPath, thumbResizePath);

          case 55:
            _context.next = 57;
            return compressJPG(thumbPath);

          case 57:
            _context.next = 59;
            return compressJPG(thumbResizePath);

          case 59:
            _context.next = 61;
            return getImgHeight(thumbPath);

          case 61:
            th = _context.sent;

          case 62:
            if (!(post.recommendSrc && post.recommendSrc !== 'empty')) {
              _context.next = 77;
              break;
            }

            recommend64 = post.recommendSrc.replace(/^data:image\/jpeg;base64,/, '');
            recommendPath = '' + basePath + newId + '_r.jpeg';
            recommendWMPath = basePath + '../_wm/wm_r.png';
            recommendResizePath = '' + basePath + newId + '_rr.jpeg';
            _context.next = 69;
            return writeFileFromByte64(recommendPath, recommend64);

          case 69:
            _context.next = 71;
            return addWM2Img(recommendPath, recommendWMPath);

          case 71:
            _context.next = 73;
            return cloneResize15(recommendPath, recommendResizePath);

          case 73:
            _context.next = 75;
            return compressJPG(recommendPath);

          case 75:
            _context.next = 77;
            return compressJPG(recommendResizePath);

          case 77:
            data = { th: th, mh: mh, title: post.title, cate: post.cate, type: post.type, _id: newId, processed: true, publish: post.publish };
            _context.next = 80;
            return updatePostById(data);

          case 80:
            _context.next = 82;
            return requestOK(res, data);

          case 82:
            _context.next = 88;
            break;

          case 84:
            _context.prev = 84;
            _context.t1 = _context['catch'](10);

            console.log(_context.t1);
            return _context.abrupt('return', res.status(_context.t1.code).send());

          case 88:
            return _context.abrupt('return', null);

          case 89:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[10, 84]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.update = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
    var post, currentId, basePath, isGif, mh, media64, mediaPath, mediaWMPath, mediaResizePath, th, thumb64, thumbPath, thumbWMPath, thumbResizePath, recommend64, recommendPath, recommendWMPath, recommendResizePath, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            post = req.body;
            // console.log(post);
            // const baseUrl = 'http://localhost:4000/';

            currentId = post._id;
            basePath = '' + storeDir + currentId + '/';
            _context2.prev = 3;
            _context2.next = 6;
            return checkExist(basePath);

          case 6:
            _context2.t0 = !_context2.sent;

            if (!_context2.t0) {
              _context2.next = 10;
              break;
            }

            _context2.next = 10;
            return createFolder(basePath);

          case 10:
            isGif = post.type === 1;
            mh = post.mh;

            if (!post.mediaSrc) {
              _context2.next = 46;
              break;
            }

            media64 = post.mediaSrc.replace(/^data:(video|image)\/(jpeg|mp4);base64,/, '');
            mediaPath = '' + basePath + currentId + '_m.' + (isGif ? 'mp4' : 'jpeg');
            mediaWMPath = basePath + '../_wm/wm_m.png';
            _context2.next = 18;
            return removeF('' + basePath + currentId + '_m.mp4');

          case 18:
            _context2.next = 20;
            return removeF('' + basePath + currentId + '_m.jpeg');

          case 20:
            _context2.next = 22;
            return writeFileFromByte64(mediaPath, media64);

          case 22:
            if (isGif) {
              _context2.next = 34;
              break;
            }

            mediaResizePath = '' + basePath + currentId + '_mr.jpeg';
            _context2.next = 26;
            return addWM2Img(mediaPath, mediaWMPath);

          case 26:
            _context2.next = 28;
            return cloneResize15(mediaPath, mediaResizePath);

          case 28:
            _context2.next = 30;
            return compressJPG(mediaPath);

          case 30:
            _context2.next = 32;
            return compressJPG(mediaResizePath);

          case 32:
            _context2.next = 38;
            break;

          case 34:
            _context2.next = 36;
            return resizeMp4(mediaPath);

          case 36:
            _context2.next = 38;
            return addWM2Mp4(mediaPath, mediaWMPath);

          case 38:
            if (isGif) {
              _context2.next = 44;
              break;
            }

            _context2.next = 41;
            return getImgHeight(mediaPath);

          case 41:
            _context2.t1 = _context2.sent;
            _context2.next = 45;
            break;

          case 44:
            _context2.t1 = 0;

          case 45:
            mh = _context2.t1;

          case 46:
            th = post.th;

            if (!(post.thumbSrc && post.thumbSrc !== 'empty')) {
              _context2.next = 67;
              break;
            }

            thumb64 = post.thumbSrc.replace(/^data:image\/jpeg;base64,/, '');
            thumbPath = '' + basePath + currentId + '_t.jpeg';
            thumbWMPath = basePath + '../_wm/wm_t.png';
            thumbResizePath = '' + basePath + currentId + '_tr.jpeg';
            _context2.next = 54;
            return removeF(thumbPath);

          case 54:
            _context2.next = 56;
            return writeFileFromByte64(thumbPath, thumb64);

          case 56:
            _context2.next = 58;
            return addWM2Img(thumbPath, thumbWMPath);

          case 58:
            _context2.next = 60;
            return cloneResize15(thumbPath, thumbResizePath);

          case 60:
            _context2.next = 62;
            return compressJPG(thumbPath);

          case 62:
            _context2.next = 64;
            return compressJPG(thumbResizePath);

          case 64:
            _context2.next = 66;
            return getImgHeight(thumbPath);

          case 66:
            th = _context2.sent;

          case 67:
            if (!(post.recommendSrc && post.recommendSrc !== 'empty')) {
              _context2.next = 84;
              break;
            }

            recommend64 = post.recommendSrc.replace(/^data:image\/jpeg;base64,/, '');
            recommendPath = '' + basePath + currentId + '_r.jpeg';
            recommendWMPath = basePath + '../_wm/wm_r.png';
            recommendResizePath = '' + basePath + currentId + '_rr.jpeg';
            _context2.next = 74;
            return removeF(recommendPath);

          case 74:
            _context2.next = 76;
            return writeFileFromByte64(recommendPath, recommend64);

          case 76:
            _context2.next = 78;
            return addWM2Img(recommendPath, recommendWMPath);

          case 78:
            _context2.next = 80;
            return cloneResize15(recommendPath, recommendResizePath);

          case 80:
            _context2.next = 82;
            return compressJPG(recommendPath);

          case 82:
            _context2.next = 84;
            return compressJPG(recommendResizePath);

          case 84:
            data = { th: th, mh: mh, title: post.title, cate: post.cate, type: post.type, _id: currentId, processed: true, publish: post.publish };
            _context2.next = 87;
            return updatePostById(data);

          case 87:
            _context2.next = 89;
            return requestOK(res, data);

          case 89:
            _context2.next = 95;
            break;

          case 91:
            _context2.prev = 91;
            _context2.t2 = _context2['catch'](3);

            console.log(_context2.t2);
            return _context2.abrupt('return', res.status(_context2.t2.code).send());

          case 95:
            return _context2.abrupt('return', null);

          case 96:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 91]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
function removePost(post) {
  return new Promise(function (resolve, reject) {
    post.remove(function (err, deletedPost) {
      if (err) {
        reject({ code: 500, err: err });return;
      }
      resolve(deletedPost);
    });
  });
}
exports.remove = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
    var post, basePath;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            post = req.post;

            if (!post.processed) {
              _context3.next = 11;
              break;
            }

            basePath = '' + storeDir + post._id + '/';
            _context3.next = 5;
            return removeF(basePath);

          case 5:
            _context3.next = 7;
            return removePost(post);

          case 7:
            _context3.next = 9;
            return requestOK(res, post);

          case 9:
            _context3.next = 12;
            break;

          case 11:
            res.status(403).send('File is not processed');

          case 12:
            return _context3.abrupt('return');

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.count = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _post2.default.count({}, function (err, count) {
              if (err) return res.status(500).send();
              return res.status(200).send({ message: 'OK', data: count });
            });

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
function gifToMp4(gifPath) {
  return new Promise(function (resolve, reject) {
    var command = (0, _fluentFfmpeg2.default)(gifPath).format('mp4').on('end', function (err) {
      if (err) {
        reject({ code: 500, err: err });return;
      }
      resolve();
    });
    command.save(gifPath);
  });
}
function file2Byte64(path) {
  return new Promise(function (resolve, reject) {
    _fsExtra2.default.readFile(path, function (err, data) {
      if (err) {
        reject({ code: 500, err: err });return;
      }
      resolve(new Buffer(data).toString('base64'));
    });
  });
}
exports.gif2mp4 = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
    var gif64, basePath, gifPath, byte64mp4;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // console.log(req.body);
            gif64 = req.body.gif64;

            gif64 = gif64.replace(/^data:(video|image)\/(jpeg|mp4|gif);base64,/, '');
            basePath = storeDir + '_temp_gif/';
            gifPath = '' + basePath + Math.round(Math.random() * 100000) + '.gif';
            _context5.prev = 4;
            _context5.next = 7;
            return writeFileFromByte64(gifPath, gif64);

          case 7:
            _context5.next = 9;
            return gifToMp4(gifPath);

          case 9:
            _context5.next = 11;
            return file2Byte64(gifPath);

          case 11:
            byte64mp4 = _context5.sent;
            _context5.next = 14;
            return removeF(gifPath);

          case 14:
            byte64mp4 = 'data:video/mp4;base64,' + byte64mp4;
            _context5.next = 17;
            return requestOK(res, byte64mp4);

          case 17:
            _context5.next = 23;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5['catch'](4);

            console.log(_context5.t0);
            return _context5.abrupt('return', res.status(_context5.t0.code).send());

          case 23:
            return _context5.abrupt('return', null);

          case 24:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[4, 19]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.get = function (req, res) {
  return res.json({ data: req.post });
};

exports.review = function (req, res) {
  req.post.review = true;
  req.post.save();
  res.status(200).send({ data: true });
};
exports.publish = function (req, res) {
  req.post.publish = !req.post.publish;
  req.post.save();
  res.status(200).send({ data: req.post.publish });
};
exports.postByID = function (req, res, next, id) {
  _post2.default.findById(id).populate('creator', 'displayName username avatar').populate('categories', 'title')
  // .populate('type', 'title')
  .exec(function (err, post) {
    if (err) {
      // console.log(1);
      return res.status(400).send();
    }
    if (!post) {
      return res.status(400).send({
        messages: ['Failed to load post ' + id]
      });
    }
    req.post = post;
    next();
    return null;
  });
  return null;
};
exports.follow = function (req, res) {
  var isFollowed = false;
  req.post.follows.forEach(function (follow) {
    follow === req.user._id && (isFollowed = true);
    return null;
  });
  if (!isFollowed) {
    _post2.default.findByIdAndUpdate(req.post._id, {
      $addToSet: {
        follows: req.user._id
      }
    }).exec(function (err) {
      return err ? res.status(400).send() : res.status(200).send({
        data: {
          follow: true
        }
      });
    });
  } else {
    _post2.default.findByIdAndUpdate(req.post._id, {
      $pull: {
        follows: req.user._id
      }
    }).exec(function (err) {
      return err ? res.status(400).send() : res.status(200).send({
        data: {
          follow: false
        }
      });
    });
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, "server/controllers"))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutoIncrement = __webpack_require__(8);

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

var _serverConfig = __webpack_require__(0);

var _serverConfig2 = _interopRequireDefault(_serverConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema; /**
                                         * Created by andh on 1/29/17.
                                         */

var connection = _mongoose2.default.createConnection(_serverConfig2.default.mongoURL);
_mongooseAutoIncrement2.default.initialize(connection);
// var random = require('mongoose-simple-random');
var PostSchema = new Schema({
  title: {
    type: String,
    trim: true,
    // required: 'Cấn tiêu đề',
    maxlength: 100
  },
  mh: {
    type: Number,
    default: 0
  },
  th: {
    type: Number,
    default: 0
  },
  cate: {
    type: Number
  },
  shares: [{
    type: Number,
    default: []
  }],
  view: {
    type: Number,
    default: 0
  },
  reports: [{
    type: Number,
    default: []
  }],
  votes: [{
    type: Number,
    default: []
  }],
  created: {
    type: Date,
    default: Date.now
  },
  point: {
    type: Number,
    default: 1
  },
  creator: {
    type: Number
  },
  type: {
    type: Number
  },
  publish: {
    type: Boolean,
    default: true
  },
  processed: {
    type: Boolean,
    default: false
  }
});
PostSchema.plugin(_mongooseAutoIncrement2.default.plugin, {
  model: 'Post',
  startAt: 1
});
// ContentSchema.statics.findChallengeByURL = function(url, callback) {
//     this.findOne({
//             url: url
//         }).populate('creator', 'displayName username avatar')
//         .populate('categories', 'title')
//         .populate('types', 'title')
//         .exec(callback);
// };
// GameSchema.plugin(random);
PostSchema.index({ title: 'text', description: 'text' });
PostSchema.set('toJSON', { getters: true, virtuals: true });
exports.default = _mongoose2.default.model('Post', PostSchema);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = __webpack_require__(0);

var _server2 = _interopRequireDefault(_server);

var _admin = __webpack_require__(5);

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BearerStrategy = __webpack_require__(29).Strategy;

var Jwt = __webpack_require__(7);

var privateKey = _server2.default.key.privateKey;

exports.default = function (passport) {
  passport.use(new BearerStrategy({}, function (token, done) {
    if (token === _server2.default.token.guest) {
      return done(null, 'guest');
    }
    Jwt.verify(token, privateKey, function (err, decoded) {
      if (decoded === undefined) {
        return done(null, false);
      }
      // console.log(decoded.email);
      _admin2.default.findAdminByEmail(decoded.email, function (err1, admin) {
        return !admin ? done(null, false) : done(null, admin);
      });
      return null;
    });
    return null;
  }));
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportLocal = __webpack_require__(30);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalStrategy = _passportLocal2.default.Strategy;

var Admin = _mongoose2.default.model('Admin');
// import Admin from '../../models/admin.model';

exports.default = function (passport) {
  passport.use(new LocalStrategy(function (email, password, done) {
    Admin.findOne({
      email: email
    }, function (err, admin) {
      if (err) {
        return done(err);
      }

      if (!admin) {
        return done(null, false, {
          message: 'Tài khoản không tồn tại'
        });
      }
      if (!admin.authenticate(password, admin.salt)) {
        return done(null, false, {
          message: 'Sai mật khẩu'
        });
      }
      return done(null, admin);
    });
  }));
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _compression = __webpack_require__(14);

var _compression2 = _interopRequireDefault(_compression);

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = __webpack_require__(3);

var _passport2 = _interopRequireDefault(_passport);

var _bodyParser = __webpack_require__(13);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = __webpack_require__(17);

var _path2 = _interopRequireDefault(_path);

var _cors = __webpack_require__(15);

var _cors2 = _interopRequireDefault(_cors);

var _expressSession = __webpack_require__(16);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _api = __webpack_require__(11);

var _api2 = _interopRequireDefault(_api);

var _auth = __webpack_require__(12);

var _auth2 = _interopRequireDefault(_auth);

var _server = __webpack_require__(0);

var _server2 = _interopRequireDefault(_server);

var _mongoose3 = __webpack_require__(9);

var _mongoose4 = _interopRequireDefault(_mongoose3);

var _passport3 = __webpack_require__(10);

var _passport4 = _interopRequireDefault(_passport3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Webpack Requirements
// import webpack from 'webpack';
// import webpackConfig from '../webpack.config.dev';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
var app = new _express2.default();

// Run Webpack dev server in development mode
// if (process.env.NODE_ENV === 'development') {
//   const compiler = webpack(webpackConfig);
//   app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
//   app.use(webpackHotMiddleware(compiler));
// }

// import posts from './routes/post.routes';

// import dummyData from './dummyData';


if (process.env.NODE_ENV === 'development') {
  app.use((0, _cors2.default)());
}
app.use((0, _expressSession2.default)({
  saveUninitialized: true,
  secret: 'Tuoihoctro',
  resave: true
}));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
// Apply body Parser and server public assets and routes
app.use((0, _compression2.default)());
app.use(_bodyParser2.default.json({ limit: '20mb' }));
// app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist')));
app.use(_express2.default.static(_path2.default.resolve(__dirname, '../public')));
app.use('/api', _api2.default);
app.use('/auth', _auth2.default);
// send all requests to index.html so browserHistory works
app.get('*', function (req, res) {
  res.sendFile('index.html', { root: _path2.default.join(__dirname, '../dist') });
});
(0, _mongoose4.default)(_mongoose2.default, function () {
  // start app
  app.listen(_server2.default.port, function (error) {
    if (!error) {
      console.log('MERN is running on port: ' + _server2.default.port + '! Build something amazing!'); // eslint-disable-line
    }
  });
  (0, _passport4.default)(_passport2.default);
});

exports.default = app;
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("fluent-ffmpeg");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("passport-http-bearer");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ })
/******/ ]);