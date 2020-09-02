// 用户注册
var express = require('express');
var router = express.Router();
let sqlQuery = require('../../modules/sqlQuery')
let secret = require('../../modules/secret')

router.get('/', function(req, res, next) {
  res.render('sign/signUp');
});

router.post('/',async function(req, res, next) {
  let {name, password}= req.body
  let sqlStr = 'select * from user where name = ?'
  let result = await sqlQuery(sqlStr,[name])
  console.log(result);
  
  if(result.length != 0 && result[0].state == 'true'){
    console.log('1111');
    // 告知此用户名已经存在，请直接登录或找回密码
    res.json({
      state: 'false',
      content: '该用户名已存在，请直接登录'
    })
  }else if (result.length != 0 && result[0].state == 'false') {
    let sqlStr = "update user set password=?,phone=?,email=?,rid=?,state=? where name = ?"
      await sqlQuery(sqlStr,[secret(password),null,null,0,'true',name])
      res.json({
        state: 'ok',
        content: '注册成功'
      })
  }else{
  let sqlStr = `insert into user (name,password,rid,state) values (?,?,0,true)`
  await sqlQuery(sqlStr,[name,secret(password)])
  res.json({
    state: 'ok',
    content: '注册成功'
  })}
  
  
  
  // {
  //   if(result.length != 0 &&result[0].using == 'false'){
  //     let sqlStr = 'update user set name=?,password=?,phone=?,email=?,rid=?,using=? where name = ?'
  //   await sqlQuery(sqlStr,[name,secret(password),null,null,0,'true',name])
  //   res.json({
  //     state: 'ok',
  //     content: '注册成功'
  //   })
  //   }else{
  //   let sqlStr = "insert into user (name,password,rid,using) values (?,?,0,true)"
  //   await sqlQuery(sqlStr,[name,secret(password)])
  //   res.json({
  //     state: 'ok',
  //     content: '注册成功'
  //   })}
  // }
});

module.exports = router;

