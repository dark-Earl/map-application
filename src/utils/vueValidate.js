import IdCardNoUtil from '@/utils/card'

export default {
  checkEmail: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入电子邮箱'))
    } else {
      const mailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
      callback()
    }
  },
  checkBl: (rule, value, callback) => {
    let smallLen = 0
    if (value.indexOf('.') > -1) {
      let parts = value.split('.')
      smallLen = parts[1].length
    }
    if (Number(value) > 100) {
      callback(new Error('请输入小于100%的比例'))
    } else if (smallLen > 6) {
      callback(new Error('比例的小数位不能超过6位'))
    } else {
      callback()
    }
  },
  checkPhone: (rule, value, callback) => {
    if (value === '' || value === undefined || value == null) {
      callback(new Error('请输入手机号码'))
    } else {
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if ((!reg.test(value))) {
        callback(new Error('请输入正确的电话号码'))
      } else {
        callback()
      }
    }
  },

  checkzjbh: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入证件号码'))
    } else {
      const result =  IdCardNoUtil.checkIdCardNo(value);
      if (!result) {
        callback(new Error('请输入正确的证件号码'))
      } else {
        callback()
      }
    }
  },

  /**
   * 统一社会信用代码
   * @param rule
   * @param value
   * @param callback
   */
  checkSocialZjbh: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入证件号码'))
    } else {
      const reg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
      if ((!reg.test(value))) {
        callback(new Error('请输入正确的证件号码'))
      } else {
        callback()
      }
    }
  },

  checkPrice: (rule, value, callback) => {
    if (value === '' || value === undefined || value === null) {
      callback(new Error('请输入金额'))
    } else {
      const reg = /^-?[0-9]*(\.[0-9]*)?$/
      if ((!reg.test(value))) {
        callback(new Error('请输入正确的金额'))
      } else {
        callback()
      }
    }
  },

  checkPositivePrice: (rule, value, callback) => {
    if (value === '' || value === undefined || value === null) {
      callback(new Error('请输入金额'))
    } else if (value < 0) {
      callback("请输入大于等于0的数字");
    } else {
      const reg = /^[0-9]*(\.[0-9]*)?$/
      if ((!reg.test(value))) {
        callback(new Error('请输入正确的金额'))
      } else {
        callback()
      }
    }
  },

  // 允许金额为负数
  checkNegativePrice: (rule, value, callback) => {
    if (value === '' || value === undefined || value === null) {
      callback(new Error('请输入金额'))
    }else {
      const reg = /^-?[0-9]*(\.[0-9]*)?$/
      if ((!reg.test(value))) {
        callback(new Error('请输入正确的金额'))
      } else {
        callback()
      }
    }
  },

  checkStock: (rule, value, callback) => {
    if (value === '' || value === undefined || value === null) {
      callback(new Error('请输入股份数量'))
    } else if (value < 0) {
      callback("请输入大于等于0的数字");
    } else {
      const reg = /^-?[0-9]*(\.[0-9]*)?$/
      if ((!reg.test(value))) {
        callback(new Error('请输入正确的股份数量'))
      } else {
        callback()
      }
    }
  },
  checkPositiveNumber: (rule, value, callback) => {
    if (value === '' || value === undefined || value === null) {
      callback(new Error('请输入数量'))
    } else if (value < 0||value === 0) {
      callback("请输入大于0的数字");
    } else {
      const reg = /^[0-9]*(\.[0-9]*)?$/
      if ((!reg.test(value))) {
        callback(new Error('请输入正确的数量'))
      } else {
        callback()
      }
    }
  },
  checkImgCaptcha: (rule, value, callback) => {
    const reg = /^[a-zA-Z0-9]{5}$/
    if ((!reg.test(value))) {
      callback(new Error('图形验证码格式错误'))
    } else {
      callback()
    }
  },
  checkCaptcha: (rule, value, callback) => {
    const reg = /^\d{6}$/
    if ((!reg.test(value))) {
      callback(new Error('短信验证码格式错误'))
    } else {
      callback()
    }
  },
  checkGdbh: (rule, value, callback) => {
    const reg = /^[a-zA-Z0-9]{12}$/
    if ((!reg.test(value))) {
      callback(new Error('股东编号格式错误'))
    } else {
      callback()
    }
  },
  /**
   * 可区分全角字符/半角字符的长度校验。
   * @param min
   * @param max
   * @returns {Function}
   */
  length({min=0,max=100000000}){
    return function(rule, value,callback) {
      if (value === '' || value === undefined) { callback() }
      let realLength = value.replace(/[\u0391-\uFFE5]/g,'aa').length;
      realLength <= max && realLength >= min ? callback() : max<100000000 ? callback('输入长度应在'+min+'到'+max+'个字符之间！') : callback('至少应输入'+min+'个字符！');
    }
  },
  checkNumber: (rule, value, callback) => {
    let reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/ // 大于0的数字包括小数和证书
    if (!value) {
      callback("请输入数量")
    } else if (!reg.test(value)) {
      callback("请输入大于0的数字")
    }
    callback()
  }
}
