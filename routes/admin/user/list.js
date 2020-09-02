// 用户列表
var express = require('express');
var router = express.Router();
let sqlQuery = require('../../../modules/sqlQuery')


/* GET home page. */
router.get('/true',async (req,res)=>{
  let page = parseInt(req.query.page) 
  let limitNum = parseInt(req.query.limit)
  let sqlStr = "select * from user left join roles on user.rid = roles.rid where user.state = 'true' limit ?, ?"
  let arr = [(page-1)*limitNum, limitNum]
  let result = await sqlQuery(sqlStr,arr)
  // 获取用户总数
  let sqlStr2 = "select count(uid) as usersNum from user where user.state = 'true'"
  let result1 = await sqlQuery(sqlStr2)
  let count = result1[0].usersNum
  let options = {
    "code": 0,
    "msg": "OK",
    "count": count,
    "data": Array.from(result)
  } 
  res.json(options)
})

router.get('/false',async (req,res)=>{
  let page = parseInt(req.query.page) 
  let limitNum = parseInt(req.query.limit)
  let sqlStr = "select * from user left join roles on user.rid = roles.rid where user.state = 'false' limit ?, ?"
  let arr = [(page-1)*limitNum, limitNum]
  let result = await sqlQuery(sqlStr,arr)
  // 获取用户总数
  let sqlStr2 = "select count(uid) as usersNum from user where user.state = 'false'"
  let result1 = await sqlQuery(sqlStr2)
  let count = result1[0].usersNum
  let options = {
    "code": 0,
    "msg": "OK",
    "count": count,
    "data": Array.from(result)
  } 
  res.json(options)
})

module.exports = router;
