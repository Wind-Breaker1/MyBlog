var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
// 数据库
var db = require('./db/connect');

// 引入路由
var usersRouter = require('./routes/users');
var arrticlesRouter = require('./routes/articles');
var jottingsRouter = require('./routes/jotting');
var classifiesRouter = require('./routes/classify');
var synthesisRouter = require('./routes/synthesis');

var app = express();
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
app.use('/api/articles', arrticlesRouter);
app.use('/api/jottings', jottingsRouter);
app.use('/api/classifies', classifiesRouter);
app.use('/api/synthesis', synthesisRouter);

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
