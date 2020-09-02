// 个人信息相关
var express = require('express');
var router = express.Router();
let sqlQuery = require('../../modules/sqlQuery')
let secret = require('../../modules/secret')
let updateInfoRouter = require('./user/updateInfo')
let listRouter = require('./user/list')
let checkInfoRouter = require('./user/checkInfo')
let editInfoRouter = require('./user/editInfo')
let addRouter = require('./user/add')
let deleteRouter = require('./user/delete')
let searchRouter = require('./user/search')
let reuseRouter = require('./user/reuse')
let authRouter = require('./user/auth')





/* GET home page. */
router.get('/', async function(req, res, next) {
  // 获取用户名
  let name = req.session.name
  // 通过用户名查找用户信息
  let sqlStr = 'select * from user left join roles on user.rid = roles.rid where user.name = ?'
  let result = await sqlQuery(sqlStr,[name])
  let user = result[0]
  let options = {user}
  res.render('admin/updateInfo',options)
});



router.use('/updateInfo',updateInfoRouter)
router.use('/list',listRouter)
router.use('/checkInfo',checkInfoRouter)
router.use('/editInfo',editInfoRouter)
router.use('/add',addRouter)
router.use('/delete',deleteRouter)
router.use('/search',searchRouter)
router.use('/reuse',reuseRouter)
router.use('/auth',authRouter)











module.exports = router;
