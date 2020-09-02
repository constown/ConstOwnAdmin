var express = require('express');
var router = express.Router();
var userRouter = require('./user');

let sqlQuery = require('../../modules/sqlQuery')


// 判断是否符合进入后台的条件
function permission(req,res,next){
  if(req.session.name== undefined){
    // 未登录
    res.render('info/tipInfo',{
      title:'尚未登录',
      content: '请重新登录，即将进入登录页',
      href: 'signIn',
      hrefTxt: '登录页'
    })
  }else{
    next()
  }
}

router.get('/', permission, async function(req, res, next) {
  let name = req.session.name
  let sqlStr = 'select * from user where name = ?'
  let result = await sqlQuery(sqlStr,name)
  res.render('admin/admin',{
    name: result[0].name
  })
});


// 后台的用户管理
router.use('/user',userRouter)

module.exports = router;
