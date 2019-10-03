const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');
require('dotenv/config');

const userController = require('./routes/users');
const diaryController = require('./routes/diaries');
const categoryController = require('./routes/categories');
const commentsController = require('./routes/comments');
const storiesController = require('./routes/stories');
const postsController = require('./routes/posts');
const groupsController = require('./routes/groups');

const mongoURI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/anonymous';
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true }, err => {
  if (err) {
    console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
    console.error(err.stack);
    process.exit(1);
  }
  console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.options('*', cors());
app.use(cors());

app.get('/api', function(req, res) {
  res.json({ message: 'Welcome to your DIT341 backend ExpressJS project!' });
});

app.use('/api/posts', postsController);
app.use('/api/groups', groupsController);
app.use('/api/users', userController);
app.use('/api/diaries', diaryController);
app.use('/api/categories', categoryController);
app.use('/api/comments', commentsController);
app.use('/api/stories', storiesController);

app.use('/api/*', function(req, res) {
  res.status(404).json({ message: 'Not Found!!!' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
const root = path.normalize(__dirname + '/..');
const client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
const env = app.get('env');
app.use((err, req, res) => {
  console.error(err.stack);
  const err_res = {
    message: err.message,
    error: {}
  };

  if (env === 'development') {
    err_res['error'] = err;
  }
  res.status(err.status || 500);
  res.json(err_res);
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`Express server listening on port ${port}, in ${env} mode`);
  console.log(`Backend: http://localhost:${port}/api/`);
  console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
