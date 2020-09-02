var express = require('express');
var router = express.Router();
let sqlQuery = require('../../../modules/sqlQuery')

/* GET home page. */
router.post('/', async (req, res)=>{
  let {phone, email} = req.body
  let name = req.session.name
  let sqlStr = 'update user set phone=?,email = ? where name = ?'
  let arr = [phone,email,name]
  await sqlQuery(sqlStr,arr)
  res.json({
    state:"OK",
    content:"个人信息更新成功",
  })
})

module.exports = router;
