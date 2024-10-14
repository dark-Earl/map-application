import sm3 from './sm3.js'
import rsa from '@/utils/rsa'
import { getPublicKey } from '@/api/EncryptHandle'
export default {
  /**
   * 对密码加密
   * 网站端使用国密SM3加密
   *前后拼接固定未数随机数
   *使用RSA公钥二次加密(公钥可存JS)
   */
  encryptPwd (data) {
    let level1 = sm3.doSM3(data)
    let level2 = this.random(level1)
    return rsa.rsaPublicData(level2)
  },
  /**
   * 敏感信息加密
   * @param data
   */
  encryptInfo (data) {
    return rsa.rsaPublicData(data)
  },
  /* 前后拼接固定位数随机数 */
  random (data) {
    let beforeNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-4)
    let afterNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-4)
    return beforeNum + data + afterNum
  },
  setPublicKey () {
    let publicKey = localStorage.getItem('publicKey')
    if (publicKey === null) {
      getPublicKey().then(res => {
        if (res.data != null) {
          publicKey = res.data
          localStorage.setItem('publicKey', publicKey)
        } else {
          this.$message.warning('获取公钥失败')
        }
      }).catch(e => {
        console.log(e)
        this.$message.warning(e.message)
      })
    }
  }
}
