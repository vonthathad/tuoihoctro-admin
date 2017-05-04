import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import passport from 'passport';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
// Webpack Requirements
// import webpack from 'webpack';
// import webpackConfig from '../webpack.config.dev';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
// if (process.env.NODE_ENV === 'development') {
//   const compiler = webpack(webpackConfig);
//   app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
//   app.use(webpackHotMiddleware(compiler));
// }

// import posts from './routes/post.routes';
import api from './routes/api.routes';
import auth from './routes/auth.routes';
// import dummyData from './dummyData';
import serverConfig from './configs/server.config';
import mongooseAction from './modules/mongoose';
import passportAction from './modules/passport';


if (process.env.NODE_ENV === 'development') { app.use(cors()); }
app.use(session({
  saveUninitialized: true,
  secret: 'Tuoihoctro',
  resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());
// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
// app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use(Express.static(path.resolve(__dirname, '../public')));
app.use('/api', api);
app.use('/auth', auth);
// send all requests to index.html so browserHistory works
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../dist') });
});
mongooseAction(mongoose, () => {
  // start app
  app.listen(serverConfig.port, (error) => {
    if (!error) {
      console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
    }
  });
  passportAction(passport);
});


export default app;
