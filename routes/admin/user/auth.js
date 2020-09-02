
// 用户信息
var express = require('express');
var router = express.Router();
let sqlQuery = require('../../../modules/sqlQuery')


/* GET home page. */
router.get('/',async (req,res)=>{
  let page = parseInt(req.query.page) 
  let limitNum = parseInt(req.query.limit)
  let sqlStr = "select * from auth limit ?,?"
  let arr = [(page-1)*limitNum, limitNum]
  let result = await sqlQuery(sqlStr,arr)
  let sqlStr2 = "select count(id) as usersNum from auth"
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
