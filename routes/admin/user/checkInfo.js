// 用户信息
var express = require('express');
var router = express.Router();
let sqlQuery = require('../../../modules/sqlQuery')


/* GET home page. */
router.get('/',async (req,res)=>{
  let name = req.query.name
  let sqlStr = 'select * from user left join roles on user.rid = roles.rid where user.name = ?'
  let result = await sqlQuery(sqlStr,name)
  let user = result[0]
  let options = {user}
  res.render('admin/user/checkInfo',options)
})

module.exports = router;
