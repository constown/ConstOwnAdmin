var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin/admin');
// 登录
var signInRouter = require('./routes/sign/signIn');
// 注册
var signUpRouter = require('./routes/sign/signUp');
// 退出
var signOutRouter = require('./routes/sign/signOut');

var app = express();

// 引入session模块
var session = require('express-session');
// 配置session
app.use(session({
  secret: 'sdasdqwdgsasdasddgsg',
  resave: true, //强制保存
  cookie: {
    maxAge: 24*60*60*1000 //设置session有效期为1天
  },
  saveUninitialized: true //是否保存初始化的session
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 允许跨域
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})

// 前台路由
app.use('/', indexRouter);
// 后台路由
app.use('/admin', adminRouter);
// 登录
app.use('/signIn', signInRouter);
// 注册
app.use('/signUp', signUpRouter);
// 退出
app.use('/signOut', signOutRouter);




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
