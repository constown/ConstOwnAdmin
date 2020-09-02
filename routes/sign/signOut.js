// 用户退出
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.destroy()
  res.render('info/tipInfo',{
    title: '退出成功',
    content: `正在跳转至登录页`,
    href: '/signIn',
    hrefTxt: "登录页"
  })
  res.json({
    state: 'ok',
    content: '退出成功'
  })
})


module.exports = router;
