// 
var express = require('express');
var router = express.Router();
let sqlQuery = require('../../../modules/sqlQuery')


/* GET home page. */
router.post('/',async (req,res)=>{
  let {name} = req.body
  let sqlStr = 'update user set state=? where name = ?'
  await sqlQuery(sqlStr,['true',name])
  res.json({
    state: 'ok'
    ,content:'激活成功！'
  })
})


router.post('/all',async (req,res)=>{
  let arr = Object.values(req.body)
  let sqlStr = 'update user set state=? where name = ?'
    arr.forEach(async item => {
      await sqlQuery(sqlStr,['true',item])
      res.json({
        state: 'ok'
        ,content: `已成功激活`
      })
    });
})

module.exports = router;
