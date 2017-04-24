import { Router } from 'express';
import passport from 'passport';
import * as users from '../controllers/user.controller';
import * as admins from '../controllers/admin.controller';
import * as posts from '../controllers/post.controller';
import * as comments from '../controllers/comment.controller';
import * as categories from '../controllers/category.controller';
import * as games from '../controllers/game.controller';
const router = new Router();

router.use(passport.authenticate('bearer', { session: false }), users.isBanned);
/* TOKEN */
router.get('/token', users.authToken);


// ////////// USER
router.route('/users')
  .get(users.requiresLogin, users.requiresAdmin, users.list);
router.route('/users/:userName')
  .get(users.requiresLogin, users.requiresAdmin, users.get)
  .put(users.requiresLogin, users.requiresAdmin, users.update)
  .delete(users.requiresLogin, users.requiresAdmin, users.remove);
router.param('userName', users.userByUsername);

// /////////// GAME
router.get('/games', admins.requiresLogin, games.list)
  .post('/games', admins.requiresLogin, games.create);
router.get('/games/:gameId', admins.requiresLogin, games.get)
  .put('/games/:gameId', admins.requiresLogin, games.update)
  .delete('/games/:gameId', admins.requiresLogin, games.delete);
router.param('gameId', admins.requiresLogin, games.gameById);

// ////////// CATEGORY
router.post('/categories', categories.create)
  .get('/categories', categories.list);
router.route('/categories/:categoryID')
  .get(categories.get)
  .put(users.requiresManager, categories.update);
router.param('categoryID', categories.categoryByURL);

// ////////// POST
router.post('/posts', users.requiresLogin, posts.create)
  .get('/posts', posts.listPosts);
router.get('/postsRecommend', posts.listRecommendPosts);
router.route('/posts/:postID')
  .get(posts.get)
  .delete(users.requiresLogin, posts.remove);
router.route('/posts/:postID/share')
  .put(users.requiresLogin, posts.share);
router.route('/posts/:postID/view')
  .put(posts.view);
router.route('/posts/:postID/report')
  .put(users.requiresLogin, posts.report);
router.route('/posts/:postID/vote')
  .put(users.requiresLogin, posts.vote);
router.route('/posts/:postID/voteUp')
  .put(users.requiresLogin, posts.voteUp);
router.route('/posts/:postID/voteDown')
  .put(users.requiresLogin, posts.voteDown);
router.route('/posts/:postID/unVote')
  .put(users.requiresLogin, posts.unVote);
router.route('/posts/:postID/publish')
  .put(users.requiresLogin, users.requiresManager, posts.publish);
router.param('postID', posts.postByID);

// ////////// COMMENT
router.post('/comments', users.requiresLogin, comments.create)
  .get('/comments', comments.list);
router.delete('/comments/:commentID', comments.remove);
router.route('/comments/:commentID/voteUp')
  .put(users.requiresLogin, comments.voteUp);
router.route('/comments/:commentID/voteDown')
  .put(users.requiresLogin, comments.voteDown);
router.route('/comments/:commentID/unVote')
  .put(users.requiresLogin, comments.unVote);
router.param('commentID', comments.commentByID);

export default router;
