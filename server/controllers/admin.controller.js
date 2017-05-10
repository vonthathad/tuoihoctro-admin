/**
 * Created by andh on 8/4/16.
 */
const npp = 6;
import Admin from '../models/admin.model';
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
    console.log(err.errors);
    // for (const errName of err.errors) {
    //   err.errors[errName].message && messages.push(err.errors[errName].message);
    // }
  }
  return messages;
};
export function authLogout(req, res) {
  req.logout();
  res.redirect('/');
}
export function login(req, res, next) {
  passport.authenticate('local', (err, admin, info) => {
    if (err) { return next(err); }
    if (!admin) { return res.status(404).send({ error: info.message }); }
    res.status(200).send({ data: admin });
    return null;
  })(req, res, next);
}
export function register(req, res) {
  if (!req.admin) {
    const admin = new Admin();
    admin.email = req.body.email;
    admin.username = req.body.username;
    admin.password = req.body.password;
    admin.role = 2;
    admin.banned = false;
    admin.provider = 'local';
    admin.avatar = '/images/avatar.png';
    admin.created = new Date();
    const tokenDt = {
      email: req.body.email,
    };
    admin.token = Jwt.sign(tokenDt, privateKey);
    admin.save((err, result) => {
      if (err) {
        const messages = getErrorMessage(err);
        return res.status(400).send({
          messages,
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
        message: 'Hãy kiểm tra email của bạn để xác nhận tài khoản',
      });
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
    Admin.findOne({ email: decoded.email }, (err1, admin) => {
      if (err1) {
        const message = 'Token has expired :(';
        return res.render('index', { message, app: serverConfig.app, channel: serverConfig.server.channel });
      }
      if (admin === null) {
        const message = "Account doesn't exist";
        return res.render('index', { message, app: serverConfig.app, channel: serverConfig.server.channel });
      }
      admin.isVerified = true;
      admin.save((err2) => {
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
  Admin.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, admin) => {
    if (!admin) {
    //   const app = {
    //     id: config.app.id,
    //     name: config.app.name,
    //     description: config.app.description,
    //     url: config.app.url,
    //     image: config.app.image,
    //   };
      const message = 'Token has expired :(';
      return res.render('index', { message, admin: null, app: serverConfig.app, channel: serverConfig.server.channel });
    }
    return res.redirect(`/action/password/${req.params.token}`);
  });
}
export function renderPassword(req, res) {
  Admin.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, admin) => {
    if (!admin) {
            //   const app = {
            //     id: config.app.id,
            //     name: config.app.name,
            //     description: config.app.description,
            //     url: config.app.url,
            //     image: config.app.image,
            //   };
      const message = 'Token has expired :(';
      return res.render('index', { message, admin: null, app: serverConfig.app, channel: serverConfig.server.channel });
    }
    const message = 'Enter new password';
    return res.render('index', { message, admin: null, app: serverConfig.app, channel: serverConfig.server.channel });
  });
}
export function resetDone(req, res) {
  Admin.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, admin) => {
    if (!admin) {
            // req.flash('error', 'Token để reset password không tồn tại, hoặc đã hết hạn.');
            // return res.redirect('back');
      const message = 'Token has expired :(';
      return res.status(400).send({
        message,
      });
    }
        // console.log(req.body.password);
    admin.password = req.body.password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    admin.save((err1) => {
      if (err1) {
        const message = 'Error occur. Please try again';
        return res.status(400).send({
          message,
        });
      }
      Mail.sendMailDoneResetPassword(admin);
      const message = 'Change password success!';
      return res.status(200).send({
        data: admin,
        message,
      });
    });
    return null;
  });
}
export function resendVerificationEmail(req, res) {
  Admin.findAdminByEmail(req.body.email, (err, admin) => {
    if (!err) {
      if (admin === null) {
        const message = "Account doesn't exist";
        return res.status(400).send({
          message,
        });
      }
      if (admin.isVerified === true) {
        const message = 'Account has verified';
        return res.status(400).send({
          message,
        });
      }
      const tokenData = {
        email: admin.email,
      };
      Mail.sentMailVerificationLink(admin, Jwt.sign(tokenData, privateKey));
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
  Admin.findOne({ email: req.body.email }, (err, admin) => {
    if (!err) {
      if (admin === null) {
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
        admin.resetPasswordToken = token;
        admin.resetPasswordExpires = Date.now() + 3600000;
        admin.save((err2) => {
          if (err2) {
            const message = 'Error occur. Please try again';
            return res.status(400).send({
              message,
            });
          }
          Mail.sendMailResetPassword(admin, token);
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
  if (req.admin) {
    req.admin.save();
    return res.json({ admin: req.admin });
  }
  res.status(400).send();
  return null;
}
export function get(req, res) {
  res.status(200).send({ message: 'OK', data: req.selectedAdmin });
}

export function update(req, res) {
  if (req.body.avatar) req.selectedAdmin.avatar = req.body.avatar;
    // if (req.body.username) dataChange.username = req.body.username;
  if (req.body.displayName) req.selectedAdmin.displayName = req.body.displayName;
  Admin.findOneAndUpdate({ _id: req.selectedAdmin._id }, req.body, '-password -salt -token -isVerified -providerData').exec((err, admin) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    return res.status(200).send({ message: 'OK', data: admin });
  });
}
export function remove(req, res) {
  Admin.findByIdAndRemove(req.selectedAdmin._id).exec((err, admin) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    return res.json(admin);
  });
}
export function adminByAdminname(req, res, next, id) {
  Admin.findOne({ username: id }, '-password -salt -token -isVerified -providerData').exec((err, admin) => {
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

export function requiresLogin(req, res, next) {
  if (req.user === 'guest' || !req.isAuthenticated()) {
    return res.status(401).send({
      message: "Haven't login",
    });
  }
  next();
  return null;
}
export function requiresEditor(req, res, next) {
  if (req.user.role === 0 || req.user.role === 1) {
    next();
  } else {
    return res.status(403).send({
      message: 'Bạn không có quyền',
    });
  }
  return null;
}

export function requiresAdmin(req, res, next) {
  console.log('f' + req.user);
  // console.log(req.selectedAdmin);
  if (req.user.role === 0) {
    next();
  } else {
    return res.status(403).send({
      message: 'Bạn không có quyền',
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

export function listAdmins(req, res) {
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
  Admin.aggregate(
        [{
          $match: { $and: [match] },
        },
        {
          $project: {
            created: 1,
            username: 1,
            avatar: 1,
            email: 1,
            role: 1,
            banned: 1,
          },
        },
        // Sorting pipeline
        { $sort: sortType },
        { $skip: skip },
        // Optionally limit results
        { $limit: paging },
        ],
         (err, results) => {
           if (err) {
             return res.status(400).send();
           }
           if (results.length === 0) {
             return res.status(404).send();
           }
           return res.json({ data: results });
         }
    );
}

export function adminByID(req, res, next, id) {
  Admin
    .findById(id)
    .select('_id username email created banned role')
    .exec((err, admin) => {
      if (err) {
        // console.log(1);
        return res.status(400).send();
      }
      if (!admin) {
        return res.status(400).send({
          messages: [`Failed to load admin ${id}`],
        });
      }
      req.selectedAdmin = admin;
      next();
      return null;
    });
  return null;
}

exports.count = async(req, res) => {
  Admin.count({}, (err, count) => {
    if (err) return res.status(500).send();
    return res.status(200).send({ message: 'OK', data: count });
  });
};

export function create(req, res) {
  const admin = new Admin();
  admin.email = req.body.email;
  admin.username = req.body.username;
  admin.password = req.body.password;
  admin.role = req.body.role;
  admin.banned = req.body.banned;
  admin.provider = 'local';
  admin.avatar = '/images/avatar.png';
  admin.created = new Date();
  const tokenDt = {
    email: req.body.email,
  };
  admin.token = Jwt.sign(tokenDt, privateKey);
  admin.save((err, addedAdmin) => {
    if (err) return res.status(500).send();
    return res.status(200).send({ message: 'OK', data: addedAdmin });
  });
}
