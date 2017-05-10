import { Router } from 'express';
import passport from 'passport';
import * as admins from '../controllers/admin.controller';
import * as posts from '../controllers/post.controller';
const router = new Router();

router.use(passport.authenticate('bearer', { session: false }), admins.requiresLogin, admins.isBanned);
/* TOKEN */
router.get('/token', admins.authToken);


// ////////// POST
router.post('/admins', admins.requiresAdmin, admins.create)
  .get('/admins', admins.requiresAdmin, admins.listAdmins);
router.get('/admins-count', admins.requiresAdmin, admins.count);
router.route('/admins/:adminID')
  .get(admins.requiresAdmin, admins.get)
  .put(admins.requiresAdmin, admins.update)
  .delete(admins.requiresAdmin, admins.remove);
router.param('adminID', admins.adminByID);


// ////////// POST
router.post('/posts', admins.requiresEditor, posts.create)
  .get('/posts', admins.requiresEditor, posts.listPosts);
router.get('/posts-count', admins.requiresEditor, posts.count);
router.post('/gif2mp4', admins.requiresEditor, posts.gif2mp4);
router.route('/posts/:postID', admins.requiresEditor)
  .get(posts.get)
  .put(posts.update)
  .delete(posts.remove);
router.param('postID', posts.postByID);

export default router;
