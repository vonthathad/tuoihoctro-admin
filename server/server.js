import Express from 'express';
import compression from 'compression';
import path from 'path';
// import cors from 'cors';

// Initialize the Express App
const app = new Express();

app.use(Express.static(path.resolve(__dirname, '../dist')));
// send all requests to index.html so browserHistory works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});
app.listen(4001, (error) => {
  if (!error) {
      console.log(`MERN is running on port: 4001! Build something amazing!`); // eslint-disable-line
  }
});
export default app;
