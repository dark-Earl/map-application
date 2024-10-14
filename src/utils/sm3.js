export default {

  /* 国密3加密 */
  doSM3 (data) {
    const sm3 = require('sm-crypto').sm3
    return sm3(data)
  }
}
