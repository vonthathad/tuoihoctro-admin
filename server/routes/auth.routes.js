import passport from 'passport';
import { Router } from 'express';
import * as users from '../controllers/user.controller';
const router = new Router();

// ///////// LOCAL REGISTER
router.post('/register', users.register);

// ///////// LOCAL LOGIN
router.post('/login', users.login);

// ///////// LOGOUT
router.get('/logout', users.authLogout);

// ///////// FACEBOOK LOGIN
router.get('/facebook', (req, res, next) => {
  req.session.redirect = req.query.redirect || '/';
  next();
}, passport.authenticate('facebook', { scope: ['user_friends', 'email', 'public_profile'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(`${req.session.redirect}?token=${req.user.token}`);
});

// router.get('/', (req, res) => {
//   res.render('index', { message: null, app: serverConfig.app, channel: serverConfig.server.channel });
// });

export default router;
