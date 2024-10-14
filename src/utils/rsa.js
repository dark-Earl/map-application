/* 产引入jsencrypt实现数据RSA加密 */
import JSEncrypt from 'jsencrypt'
/* 产引入encryptlong实现数据RSA加密 */
import Encrypt from 'encryptlong'

const PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCm/AxMIkzRlw/9zTSjkxv+Bk/BREAFq74M7rSznOM0DmROtfsxdupdNG9yFhT5bLEcUZgW0WXOkTWsD4mTvUtUu+Cm/V4Vg7kl+blrgl0dWXn87mxbhAFS8t0AnkEnVki+Utv6qPpqRYC34ODwuIb2h+KQkTcUfO5phzB3eNHNJwIDAQAB'
// 私钥key
const privateKey = ''

export default {
  /* JSEncrypt加密 */
  rsaPublicData (data) {
    let jsencrypt = new JSEncrypt()
    jsencrypt.setPublicKey(PUBLIC_KEY)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    var result = jsencrypt.encrypt(data)
    return result
  },
  /* JSEncrypt解密 */
  rsaPrivateData (data) {
    var jsencrypt = new JSEncrypt()
    jsencrypt.setPrivateKey(privateKey)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    var result = jsencrypt.encrypt(data)
    return result
  },
  /* 加密 */
  encrypt (data) {
    var encryptor = new Encrypt()
    encryptor.setPublicKey(PUBLIC_KEY)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    const result = encryptor.encryptLong(data)
    return result
  },
  /* 解密 - PRIVATE_KEY - 验证 */
  decrypt (data) {
    const PRIVATE_KEY = privateKey
    var encryptor = new Encrypt()
    encryptor.setPrivateKey(PRIVATE_KEY)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    var result = encryptor.decryptLong(data)
    return result
  }
}
