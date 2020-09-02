// 
var express = require('express');
var router = express.Router();
let sqlQuery = require('../../../modules/sqlQuery')


/* GET home page. */
router.post('/',async (req,res)=>{
  let {name} = req.body
  let sqlStr = 'update user set state=? where name = ?'
  await sqlQuery(sqlStr,['false',name])
  res.json({
    state: 'ok'
    ,content:'用户删除成功！'
  })
})


router.post('/all',async (req,res)=>{
  let arr = Object.values(req.body)
  let sqlStr = 'update user set state=? where name = ?'
  if(arr.includes('admin')){
    res.json({
      state: 'false'
      ,content: '超级管理员账号不可删除！'
    })
  }else{
    arr.forEach(async item => {
      await sqlQuery(sqlStr,['false',item])
      res.json({
        state: 'ok'
        ,content: `已成功删除用户`
      })
    });
  }
})

module.exports = router;
