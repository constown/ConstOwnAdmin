// 用户注册
var express = require('express');
var router = express.Router();
let sqlQuery = require('../../../modules/sqlQuery')
let secret = require('../../../modules/secret')


router.post('/',async function(req, res, next) {
  let {name,phone,email,password} = req.body
  let sqlStr = 'select * from user where name = ?'
  let result = await sqlQuery(sqlStr,[name])
  if(result.length != 0 && result[0].state == 'true'){
    // 告知此用户名已经存在，请直接登录或找回密码
    res.json({
      state: 'false',
      content: '该用户名已存在'
    })
  }else if(result.length != 0 && result[0].state == 'false'){
    res.json({
      state: 'false',
      content: '该用户已注销，请激活'
    })
  }else{
    let sqlStr = "insert into user (name,password,phone,email,rid,state) values (?,?,?,?,0,'true')"
    await sqlQuery(sqlStr,[name,secret(password),phone,email])
    res.json({
      state: 'ok',
      content: '添加成功'
    })
  }
});

module.exports = router;

