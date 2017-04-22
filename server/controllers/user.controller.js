/**
 * Created by andh on 8/4/16.
 */
const npp = 6;
import User from '../models/user.model';
import Jwt from 'jsonwebtoken';
import Mail from '../configs/mail';
import serverConfig from '../configs/server.config';
const privateKey = serverConfig.key.privateKey;
// const https from'https');
import passport from 'passport';
import crypto from 'crypto';
const getErrorMessage = (err) => {
  let messages = [];
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        messages = ['Email or username is exist'];
        break;
      default: break;
    }
  } else {
    for (const errName of err.errors) {
      err.errors[errName].message && messages.push(err.errors[errName].message);
    }
  }
  return messages;
};
export function authLogout(req, res) {
  req.logout();
  res.redirect('/');
}
export function login(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.json({ message: info.message }); }
        // console.log(user);
    res.status(200).send({ data: user });
    return null;
  })(req, res, next);
}
export function register(req, res) {
    //   console.log(req.body);
  if (!req.user) {
        // console.log(req.body);
    const user = new User();
    user.email = req.body.email;
    user.username = req.body.username;
    user.displayName = req.body.username;
    user.password = req.body.password;
    user.provider = 'local';
    user.isVerified = false;
    user.avatar = '/images/avatar.png';
    const tokenDt = {
      email: req.body.email,
    };
    user.token = Jwt.sign(tokenDt, privateKey);
        // console.log(user);
    user.save((err, result) => {
            //   console.log('abc');
      if (err) {
        const messages = getErrorMessage(err);
        return res.status(400).send({
          messages,
        });
      }
      // const tokenData = {
      //   email: user.email,
      // };
      // Mail.sentMailVerificationLink(user, Jwt.sign(tokenData, privateKey));
            // message = "Hãy kiểm tra email của bạn để xác nhận tài khoản";
            // req.flash('error', message);
            //   console.log(123);
      return res.status(200).send({
        token: result.token,
        message: 'Hãy kiểm tra email của bạn để xác nhận tài khoản',
      });
            // return res.redirect('/signup');
    });
  } else {
    return res.redirect('/');
  }
  return null;
}

export function verifyEmail(req, res) {
  const token = req.params.token;
//   const app = {
//     id: config.app.id,
//     name: config.app.name,
//     description: config.app.description,
//     url: config.app.url,
//     image: config.app.image,
//   };
  Jwt.verify(token, privateKey, (err, decoded) => {
    if (decoded === undefined) {
      const message = 'Token has expired :(';
      return res.render('index', { message, app: serverConfig.app, channel: serverConfig.server.channel });
    }
    User.findOne({ email: decoded.email }, (err1, user) => {
      if (err1) {
        const message = 'Token has expired :(';
        return res.render('index', { message, app: serverConfig.app, channel: serverConfig.server.channel });
      }
      if (user === null) {
        const message = "Account doesn't exist";
        return res.render('index', { message, app: serverConfig.app, channel: serverConfig.server.channel });
      }
      user.isVerified = true;
      user.save((err2) => {
        if (err2) {
          const message = 'Error Occur. Please try again';
          return res.render('index', { message, app: serverConfig.app, channel: serverConfig.server.channel });
        }
        const message = 'Congragulation! Account has verified';
        return res.render('index', { message, app: serverConfig.app, channel: serverConfig.server.channel });
      });
      return null;
    });
    return null;
  });
}
export function resetPage(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) {
    //   const app = {
    //     id: config.app.id,
    //     name: config.app.name,
    //     description: config.app.description,
    //     url: config.app.url,
    //     image: config.app.image,
    //   };
      const message = 'Token has expired :(';
      return res.render('index', { message, user: null, app: serverConfig.app, channel: serverConfig.server.channel });
    }
    return res.redirect(`/action/password/${req.params.token}`);
  });
}
export function renderPassword(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) {
            //   const app = {
            //     id: config.app.id,
            //     name: config.app.name,
            //     description: config.app.description,
            //     url: config.app.url,
            //     image: config.app.image,
            //   };
      const message = 'Token has expired :(';
      return res.render('index', { message, user: null, app: serverConfig.app, channel: serverConfig.server.channel });
    }
    const message = 'Enter new password';
    return res.render('index', { message, user: null, app: serverConfig.app, channel: serverConfig.server.channel });
  });
}
export function resetDone(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) {
            // req.flash('error', 'Token để reset password không tồn tại, hoặc đã hết hạn.');
            // return res.redirect('back');
      const message = 'Token has expired :(';
      return res.status(400).send({
        message,
      });
    }
        // console.log(req.body.password);
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.save((err1) => {
      if (err1) {
        const message = 'Error occur. Please try again';
        return res.status(400).send({
          message,
        });
      }
      Mail.sendMailDoneResetPassword(user);
      const message = 'Change password success!';
      return res.status(200).send({
        data: user,
        message,
      });
    });
    return null;
  });
}
export function resendVerificationEmail(req, res) {
  User.findUserByEmail(req.body.email, (err, user) => {
    if (!err) {
      if (user === null) {
        const message = "Account doesn't exist";
        return res.status(400).send({
          message,
        });
      }
      if (user.isVerified === true) {
        const message = 'Account has verified';
        return res.status(400).send({
          message,
        });
      }
      const tokenData = {
        email: user.email,
      };
      Mail.sentMailVerificationLink(user, Jwt.sign(tokenData, privateKey));
      const message = 'Resend confirmation email success. Check your email to verify!';
      return res.status(200).send({
        message,
      });
    }
    const message = 'Error occur. Please try again.';
    return res.status(400).send({
      message,
    });
  });
}
export function resetPassword(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!err) {
      if (user === null) {
        const message = 'Tài khoản không tồn tại';
        return res.status(400).send({
          message,
        });
      }
      crypto.randomBytes(20, (err1, buf) => {
        if (err1) {
          const message = 'Error occur. Please try again';
          return res.status(400).send({
            message,
          });
        }
        const token = buf.toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        user.save((err2) => {
          if (err2) {
            const message = 'Error occur. Please try again';
            return res.status(400).send({
              message,
            });
          }
          Mail.sendMailResetPassword(user, token);
          const message = 'Success. Password change request has been sent to your email';
          return res.status(200).send({
            message,
          });
        });
        return null;
      });
    } else {
      const message = 'Error occur. Please try again';
      return res.status(400).send({
        message,
      });
    }
    return null;
  });
}

const getSortType = (sortType) => {
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
export function authToken(req, res) {
  if (req.user) {
    req.user.save();
    return res.json({ user: req.user });
  }
  res.status(400).send();
  return null;
}
export function get(req, res) {
  res.json({ data: req.selectedUser });
}

export function update(req, res) {
  if (req.body.avatar) req.selectedUser.avatar = req.body.avatar;
    // if (req.body.username) dataChange.username = req.body.username;
  if (req.body.displayName) req.selectedUser.displayName = req.body.displayName;
  User.findByIdAndUpdate(req.selectedUser._id, req.selectedUser, '-password -salt -token -isVerified -providerData').exec((err, user) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    return res.json(user);
  });
}
export function remove(req, res) {
  User.findByIdAndRemove(req.selectedUser._id).exec((err, user) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    return res.json(user);
  });
}
export function userByUsername(req, res, next, id) {
  User.findOne({ username: id }, '-password -salt -token -isVerified -providerData').exec((err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi server' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Không tim thấy user' });
    }
    req.selectedUser = user;
    next();
    return null;
  });
  return null;
}

export function requiresLogin(req, res, next) {
  if (req.user === 'guest' || !req.isAuthenticated()) {
    return res.status(401).send({
      message: "User doesn't login",
    });
  } else if (req.user === 'ban') {
    return res.status(403).send({
      message: 'Your account is banned',
    });
  }
  next();
  return null;
}
export function requiresManager(req, res, next) {
  if (req.user.role === 'manager' || req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).send({
      message: "You doesn't have a permission",
    });
  }
  return null;
}

export function requiresAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).send({
      message: "You doesn't have a permission",
    });
  }
  return null;
}
export function isBanned(req, res, next) {
  if (req.user.banned) {
    return res.status(403).send({
      message: 'Nick của bạn đã bị banned',
    });
  }
  next();
  return null;
}

export function list(req, res) {
  const paging = parseInt(req.query.paging, 10) || npp;
//   console.log('paging', paging);
  const page = parseInt(req.query.page, 10) || 1;
  const skip = page > 0 ? ((page - 1) * paging) : 0;
  const conds = [];
  let match = {};
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
  const sortType = getSortType(req.query.order);
  User.aggregate(
        [{
          $match: { $and: [match] },
        },
        {
          $project: {
            created: 1,
            username: 1,
            displayName: 1,
            avatar: 1,
            email: 1,
            imageNum: 1,
            imageLike: 1,
            videoNum: 1,
            videoLike: 1,
            gifNum: 1,
            gifLike: 1,
          },
        },
        // Sorting pipeline
        { $sort: sortType },
        { $skip: skip },
        // Optionally limit results
        { $limit: paging },
        ],
         (err, results) => {
        //    console.log(1 + results);
           if (err) {
            // console.log(err);
             return res.status(400).send();
           }
           res.json(results);
           return null;
         }
    );
}
