let crypto = require('crypto')

function secret(str){
  let salt = 'sadasdgadgasfdsdf'
  let obj = crypto.createHash('md5')
  str = salt + str;
  obj.update(str)
  return obj.digest('hex')
}

module.exports = secret
