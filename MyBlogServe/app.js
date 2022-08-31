const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
// 数据库
const db = require('./db/connect');

// 引入路由
const usersRouter = require('./routes/users');
const arrticlesRouter = require('./routes/blogs');
const jottingsRouter = require('./routes/jottings');
const classifiesRouter = require('./routes/classifies');
const synthesisRouter = require('./routes/synthesis');
const commentRouter = require('./routes/comments');
const routeRouter = require('./routes/routes');
const murmurRouter = require('./routes/murmur');
const photoRouter = require('./routes/photo');
const timeclueRouter = require('./routes/timeclue.js');
const app = express();

app.use(session({
  secret: '####',
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 注册路由
app.use('/api/users', usersRouter);
app.use('/api/blogs', arrticlesRouter);
app.use('/api/jottings', jottingsRouter);
app.use('/api/classifies', classifiesRouter);
app.use('/api/synthesis', synthesisRouter);
app.use('/api/comments', commentRouter);
app.use('/api/timeclues', timeclueRouter);
app.use('/api/routes', routeRouter);
app.use('/api/murmur', murmurRouter);
app.use('/api/photo', photoRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
