// 用户登录
var express = require('express');
var router = express.Router();
let sqlQuery = require('../../modules/sqlQuery')
let secret = require('../../modules/secret')

router.get('/', function(req, res, next) {
  res.render('sign/signIn');
});

router.post('/',async function(req, res, next) {
  let {name, password} = req.body
  let sqlStr = 'select * from user where name = ? and password = ?'
  let result = await sqlQuery(sqlStr,[name,secret(password)])
  if(result.length == 0 || result[0].using == 'false'){
    res.json({
      state: 'false',
      content: '用户名或密码错误'
    })
  }else{
    req.session.name = name
    res.json({
      state: 'ok',
      content: '登录成功'
    })
  }
});


module.exports = router;
