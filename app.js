var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');



var indexRouter = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var addMember = require('./routes/addMember');
var memberList = require('./routes/memberList');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 使用 session 中间件
app.use(session({
  secret :  'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
      maxAge: 1000 * 60 * 30, // harlf of hour
  },
}));



app.use('/', indexRouter);
app.use('/login', login);
app.use('/logout', logout);
app.use('/addMember', addMember);
app.use('/memberList', memberList);




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

app.listen(8001,function () {
  console.log('http://127.0.0.1:8001')
})

module.exports = app;
