var createError = require('http-errors');
var express = require('express');
var path = require('path');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-parser模块
var bodyParser = require('body-parser');
//模板处理模块
var swig = require('swig');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//第一个参数是模板引擎的名称，第二个参数是用于解析处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录
app.set('views','./views');
//注册所使用的模板引擎
app.set('view engine','html');
//在开发过程中需要取消 模板缓存
swig.setDefaults({cache: false});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/*app.use(express.static(path.join(__dirname, 'public')));*/
//设置静态文件托管
app.use('/public',express.static( __dirname + '/public' ));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
