
import { Router } from 'express';
import * as admins from '../controllers/admin.controller';
const router = new Router();

// ///////// LOCAL REGISTER
router.post('/register-admin', admins.register);

// ///////// LOCAL LOGIN
router.post('/login-admin', admins.login);

// ///////// LOGOUT
router.get('/logout-admin', admins.authLogout);

export default router;
