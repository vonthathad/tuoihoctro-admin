import { Router } from 'express';
import passport from 'passport';
import * as admins from '../controllers/admin.controller';
import * as posts from '../controllers/post.controller';
const router = new Router();

// router.use(passport.authenticate('bearer', { session: false }), admins.isBanned);
/* TOKEN */
router.get('/token', admins.authToken);


// ////////// POST
router.post('/admins', admins.create)
  .get('/admins', admins.listAdmins);
router.get('/admins-count', admins.count);
router.route('/admins/:adminID')
  .get(admins.get)
  .put(admins.update)
  .delete(admins.requiresLogin, admins.remove);
router.param('adminID', admins.adminByID);


// ////////// POST
router.post('/posts', posts.create)
  .get('/posts', posts.listPosts);
router.get('/posts-count', posts.count);
router.post('/gif2mp4', posts.gif2mp4);
router.route('/posts/:postID')
  .get(posts.get)
  .put(posts.update)
  .delete(admins.requiresLogin, posts.remove);
router.param('postID', posts.postByID);

export default router;
