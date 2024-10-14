/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * 获取页面请求参数
 * @param name
 * @returns {*}
 */
export function getRequestParam (name) {
  var queryString = window.location.hash.substring(location.hash.indexOf('?'))
  var param = queryString.substr(1, queryString.length - 1).split('&')
  for (var i = 0; i < param.length; i++) {
    var keyValue = param[i].split('=')
    if (keyValue[0] == name) return keyValue[1]
  }
  return null
}

export const Utils = {
  // 特殊符号反转义
  htmlDecode: function (str) {
    str = str.replace(/&amp;/g, '&')
    str = str.replace(/&lt;/g, '<')
    str = str.replace(/&gt;/g, '>')
    str = str.replace(/&quot;/g, '"')
    str = str.replace(/&nbsp;/g, ' ')
    return str
  },
  // 特殊符号转义
  htmlEncode: function htmlEncode (str) {
    str = str.replace(/&/g, '&amp;')
    str = str.replace(/</g, '&lt;')
    str = str.replace(/>/g, '&gt;')
    str = str.replace(/\"/g, '&quot;')
    str = str.replace(/ /g, '&nbsp;')
    return str
  },
  /**
   * 计算字符长度，汉字算两个字符
   * @param str
   */
  getChineseLength: function (str) {
    var strLength = 0
    var strArr = str.split('')
    for (var i = 0, len = strArr.length; i < len; i++) {
      if (/[\u0391-\uFFE5]/.test(strArr[i])) {
        strLength += 2
      } else {
        strLength += 1
      }
    }
    return strLength
  },
  /**
   * 截取字符串，中文算两个字符
   * @param str
   * @param limitLength
   * @return {String}
   */
  getChineseLimitLengthStr: function (str, limitLength) {
    var strLength = 0
    var resultStr = ''
    var strArr = str.split('')
    for (var i = 0, len = strArr.length; i < len; i++) {
      if (/[\u0391-\uFFE5]/.test(strArr[i])) {
        strLength += 2
      } else {
        strLength += 1
      }
      if (strLength > limitLength) {
        break
      }
      resultStr += strArr[i]
    }
    return resultStr
  },
  /**
   * 获取计算机DPI信息
   * @returns {Array}
   */
  getXYDPI: function () {
    var arrDPI = new Array()
    if (window.screen.deviceXDPI) {
      arrDPI[0] = window.screen.deviceXDPI
      arrDPI[1] = window.screen.deviceYDPI
    } else {
      var tmpNode = document.createElement('DIV')
      tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'
      document.body.appendChild(tmpNode)
      arrDPI[0] = parseInt(tmpNode.offsetWidth)
      arrDPI[1] = parseInt(tmpNode.offsetHeight)
      tmpNode.parentNode.removeChild(tmpNode)
    }
    return arrDPI
  },
  /**
   * 根据DPI计算出毫米对应的像素
   * @param width
   * @param height
   * @returns {{width: number, height: number}}
   */
  convertMM2PX: function (width, height) {
    var dpi = Utils.getXYDPI()
    var w = parseInt(width) * parseInt(dpi[0]) / 25.4
    var h = parseInt(height) * parseInt(dpi[1]) / 25.4

    return {
      width: parseInt(w),
      height: parseInt(h)
    }
  },
  /**
   * 获取页面请求参数
   * @param name
   * @returns {*}
   */
  getRequestParam: function (name) {
    var queryString = window.location.search
    var param = queryString.substr(1, queryString.length - 1).split('&')
    for (var i = 0; i < param.length; i++) {
      var keyValue = param[i].split('=')
      if (keyValue[0] == name) return keyValue[1]
    }
    return null
  },
  /* 获取时间倒计时, 参数：单位秒 */
  getTimeCountDownResult: function (secound) {
    if (secound < 0) {
      return ''
    }
    var startTag = '<span class="time-num">'
    var endTag = '</span>'
    var s = Math.floor(secound % 60)
    var m = Math.floor(secound / 60 % 60)
    var h = Math.floor(secound / 60 / 60 % 24)
    var d = Math.floor(secound / 60 / 60 / 24)
    var time = startTag + d + endTag + '天' + startTag + h + endTag + '时' + startTag + m + endTag + '分' + startTag + s + endTag + '秒' // 剩余时间（格式调整）
    return time
  },
  getTimeCountDownObj: function (secound) {
    var s = Math.floor(secound % 60)
    var m = Math.floor(secound / 60 % 60)
    var h = Math.floor(secound / 60 / 60 % 24)
    var d = Math.floor(secound / 60 / 60 / 24)
    /* d + "天" + h + "时" + m + "分" + s + "秒";   // 剩余时间（格式调整） */
    var time = { d: d, h: h, m: m, s: s }
    return time
  },
  groupArr: function (list, field) {
    var fieldList = []; var att = []
    list.map((e) => {
      fieldList.push(e[field])
    })
    // 数组去重
    fieldList = fieldList.filter((e, i, self) => {
      return self.indexOf(e) === i
    })
    for (var j = 0; j < fieldList.length; j++) {
      // 过滤出匹配到的数据
      var arr = list.filter((e) => {
        return e[field] === fieldList[j]
      })
      att.push({
        field: arr[0][field],
        list: arr
      })
    }
    return att
  },
  // 十进制-》二进制
  toBin: function (dec) {
    var bits = []
    var dividend = dec
    var remainder = 0
    while (dividend >= 2) {
      remainder = dividend % 2
      bits.push(remainder)
      dividend = (dividend - remainder) / 2
    }
    bits.push(dividend)
    bits.reverse()
    return bits.join('')
  },
  // 获取位与选择项
  getBitSelection: function (decimalNum) {
    var result = []
    if (decimalNum !== '') {
      var binaryNum = Utils.toBin(decimalNum) // 转成二进制解析
      var v = ''
      var value
      for (var j = 0, jlen = binaryNum.length; j < jlen; j++) {
        v = binaryNum.substring(jlen - j - 1, jlen - j)
        if (parseInt(v) === 1) {
          value = Math.pow(2, j)
          result.push(value)
        }
      }
    }
    return result
  },
  // 将字符串转换为日期 yyyy/MM/dd,hh:mm:ss
  toDate: function (str, format) {
    let pattern = format.replace('yyyy', '(\\~1{4})').replace('yy', '(\\~1{2})')
      .replace('MM', '(\\~1{2})').replace('M', '(\\~1{1,2})')
      .replace('dd', '(\\~1{2})').replace('d', '(\\~1{1,2})')
      .replace('hh', '(\\~1{2})').replace('h', '(\\~1{1,2})')
      .replace('mm', '(\\~1{2})').replace('m', '(\\~1{1,2})')
      .replace('ss', '(\\~1{2})').replace('s', '(\\~1{1,2})').replace(/~1/g, 'd')

    var returnDate
    if (new RegExp(pattern).test(str)) {
      var yPos = format.indexOf('yyyy')
      var mPos = format.indexOf('MM')
      var dPos = format.indexOf('dd')
      var hhPos = format.indexOf('hh')
      var mmPos = format.indexOf('mm')
      var ssPos = format.indexOf('ss')
      if (mPos === -1) mPos = format.indexOf('M')
      if (yPos === -1) yPos = format.indexOf('yy')
      if (dPos === -1) dPos = format.indexOf('d')
      if (hhPos === -1) hhPos = format.indexOf('h')
      if (mmPos === -1) mmPos = format.indexOf('m')
      if (ssPos === -1) ssPos = format.indexOf('s')

      var pos = [
        { 'index': yPos, 'tag': 'y' },
        { 'index': mPos, 'tag': 'm' },
        { 'index': dPos, 'tag': 'd' },
        { 'index': hhPos, 'tag': 'hh' },
        { 'index': mmPos, 'tag': 'mm' },
        { 'index': ssPos, 'tag': 'ss' }
      ]
      pos = pos.sort(function (a, b) { return a.index - b.index })
      var data = { y: 0, M: 0, d: 0, hh: 0, mm: 0, ss: 0 }
      var m = str.match(pattern)
      for (var i = 1; i < m.length; i++) {
        if (i === 0) return
        var flag = pos[i - 1].tag
        data[flag] = m[i]
      }
      // if (data.y.toString().length === 2) {
      //   data.y = parseInt('20' + data.y)
      // }
      data.m = data.m - 1
      returnDate = new Date(data.y, data.m, data.d, data.hh, data.mm, data.ss)
    }
    if (returnDate == null || isNaN(returnDate)) returnDate = null
    return returnDate
  },
  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  // 例子：
  // (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  // (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  formatDate: function (date, fmt) { // author: meizz
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    return fmt
  }

}

// 数字 工具类
export const NumberUtil = {
  // 保留两位小数
  /**
   * 将浮点数四舍五入
   * @param x
   * @param pos 保留小数位
   * @returns {Number}
   */
  toDecimal: function (x, pos) {
    var f = parseFloat(x)
    if (isNaN(f)) {
      return 0
    }
    var round = Math.pow(10, pos)
    f = Math.round(x * round) / round
    return f
  },

  /**
   * 制保留pos位小数，如：2，会在2后面补上00.即2.00
   * @param x
   * @param pos  强制保留的小数位
   * @returns {string}
   */
  toDecimalForce: function (x, pos) {
    var f = parseFloat(x)
    if (isNaN(f)) {
      return 0
    }
    var round = Math.pow(10, pos)
    var f = Math.round(x * round) / round
    var s = f.toString()
    var rs = s.indexOf('.')
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + pos) {
      s += '0'
    }
    return s
  },
  /**
   * 将字符串转换为number
   * @param v string
   * @returns {number}
   */
  convert2Number: function (v) {
    return new Number(v.replace(/[^0-9.]/g, '')).valueOf()
  },
  /**
   * 格式化number
   * 如：
   * formatNumber(0,'');
   * formatNumber(12432.21,'#,###');
   * formatNumber(12432.21,'#,###.000#');
   * formatNumber(12432,'#,###.00');
   * formatNumber('12432.415','#,###.0#');
   * @param number
   * @param pattern
   * @return {String}
   */
  formatNumber: function (number, pattern) {
    try {
      var flag = parseFloat(number) >= 0 ? '' : '-'
      number = parseFloat(number) >= 0 ? parseFloat(number) : -parseFloat(number)
      var str = number.toString()
      var strInt
      var strFloat
      var formatInt
      var formatFloat
      if (/\./g.test(pattern)) {
        formatInt = pattern.split('.')[0]
        formatFloat = pattern.split('.')[1]
      } else {
        formatInt = pattern
        formatFloat = null
      }

      if (/\./g.test(str)) {
        if (formatFloat != null) {
          var tempFloat = Math.round(parseFloat('0.' + str.split('.')[1]) * Math.pow(10, formatFloat.length)) / Math.pow(10, formatFloat.length)
          strInt = (Math.floor(number) + Math.floor(tempFloat)).toString()
          strFloat = /\./g.test(tempFloat.toString()) ? tempFloat.toString().split('.')[1] : '0'
        } else {
          strInt = Math.round(number).toString()
          strFloat = '0'
        }
      } else {
        strInt = str
        strFloat = '0'
      }
      if (formatInt != null) {
        var outputInt = ''
        var zero = formatInt.match(/0*$/)[0].length
        var comma = null
        if (/,/g.test(formatInt)) {
          comma = formatInt.match(/,[^,]*/)[0].length - 1
        }
        var newReg = new RegExp('(\\d{' + comma + '})', 'g')

        if (strInt.length < zero) {
          outputInt = new Array(zero + 1).join('0') + strInt
          outputInt = outputInt.substr(outputInt.length - zero, zero)
        } else {
          outputInt = strInt
        }
        var outputInt = outputInt.substr(0, outputInt.length % comma) + outputInt.substring(outputInt.length % comma).replace(newReg, (comma != null ? ',' : '') + '$1')
        outputInt = outputInt.replace(/^,/, '')
        strInt = outputInt
      }

      if (formatFloat != null) {
        var outputFloat = ''
        var zero = formatFloat.match(/^0*/)[0].length
        if (strFloat.length < zero) {
          outputFloat = strFloat + new Array(zero + 1).join('0')
          // outputFloat        = outputFloat.substring(0,formatFloat.length);
          var outputFloat1 = outputFloat.substring(0, zero)
          var outputFloat2 = outputFloat.substring(zero, formatFloat.length)
          outputFloat = outputFloat1 + outputFloat2.replace(/0*$/, '')
        } else {
          outputFloat = strFloat.substring(0, formatFloat.length)
        }
        strFloat = outputFloat
      } else {
        if (pattern != '' || (pattern == '' && strFloat == '0')) {
          strFloat = ''
        }
      }
      return flag + strInt + (strFloat == '' ? '' : '.' + strFloat)
    } catch (e) {
      return 'error'
    }
  },

  /**
   *  时间秒转为 文字显示： X天X时X分X秒
   */
  secondToDate: function (lsms) {
    if (!lsms) {
      return '0秒'
    }

    // 解决数据异常的问题
    // if( lsms>=1*24*60*60 ){
    //		return "0秒";
    // }
    var ss = 1
    var mi = ss * 60
    var hh = mi * 60
    var dd = hh * 24

    var day = parseInt(lsms / dd)
    var hour = parseInt((lsms - day * dd) / hh)
    var minute = parseInt((lsms - day * dd - hour * hh) / mi)
    var second = parseInt((lsms - day * dd - hour * hh - minute * mi) / ss)
    var milliSecond = parseInt(lsms - day * dd - hour * hh - minute * mi - second * ss)
    var strDay = ''
    if (day == 0) strDay = ''
    else strDay = day < 10 ? '0' + day + '天' : day + '天'

    var strHour = ''
    if (hour == 0) strHour = ''
    else strHour = hour < 10 ? '0' + hour + '时' : hour + '时'

    var strMinute = ''
    if (minute == 0) strMinute = ''
    else strMinute = minute < 10 ? '0' + minute + '分' : minute + '分'

    var strSecond = ''
    if (second == 0) strSecond = '0秒'
    else strSecond = second + '秒'

    var dTimeStr = strDay + strHour + strMinute + strSecond

    // 解决数据异常的问题 超长数据的解决
    if (dTimeStr.length > 12) dTimeStr = '0秒'
    return dTimeStr
  },
  // 浮点数加法运算
  floatAdd: function (arg1, arg2) {
    var r1, r2, m
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    // 动态控制精度长度
    var n = (r1 >= r2) ? r1 : r2
    var a = (arg1 * m + arg2 * m) / m
    return parseFloat(a.toFixed(n))
  },
  // 浮点数减法运算
  floatSub: function (arg1, arg2) {
    var r1, r2, m, n
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    // 动态控制精度长度
    n = (r1 >= r2) ? r1 : r2
    return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n))
  },
  // 浮点数乘法运算
  floatMul: function (arg1, arg2) {
    var m = 0
    var s1 = arg1.toString()
    var s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {}
    try {
      m += s2.split('.')[1].length
    } catch (e) {}

    var val = Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)

    return parseFloat(val.toFixed(2))
  },

  // 浮点数除法运算
  FloatDiv: function (arg1, arg2) {
    var t1 = 0
    var t2 = 0
    var r1; var r2
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {}
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {}

    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  }
}

// 人民币 大写转换 操作工具类
export const RMBUtil = {

  /**
   * 转千分符
   */
  convert2Thousand: function (oInput) {
    var re = /(-?\d+)(\d{3})/
    var num = oInput + ''
    while (re.test(num)) {
      num = num.replace(re, '$1,$2')
    }
    return num
  },
  /**
   * 转中文的大写
   * @param n
   * @returns
   */
  number2ChineseUpper: function (n) {
    // n = parseInt(n);

    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return ''
    if (typeof (n) === 'number') {
      if (n.toString().indexOf('.') == -1) {
        if (n == 0) {
          return '零'
        }
        var result = RMBUtil._seti2c(n)
        if (result.substring(result.length - 1) == '零') {
          result = result.substring(0, result.length - 1)
        }
        return result
      } else {
        var i, istr, f, fstr, a, rstr
        a = n.toString().split('.')
        i = a[0]
        f = a[1]
        istr = RMBUtil._seti2c(i)
        fstr = RMBUtil._setf2c(f)
        rstr = istr + '点' + fstr
        rstr = rstr.replace(/零+/g, '零')
        return rstr
      }
    } else {
      return '---'
    }
  },
  /**
   * 转中文的大写
   * @param n
   * @returns
   */
  number2ChineseUpperMoney: function (n) {
    // n = parseInt(n);

    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return ''
    if (typeof (n) === 'number') {
      if (n.toString().indexOf('.') == -1) {
        if (n == 0) {
          return '零元整'
        }
        return RMBUtil._seti2cMoney(n) + '整'
      } else {
        var i, istr, f, fstr, a, rstr
        a = n.toString().split('.')
        i = a[0]
        f = a[1]
        istr = RMBUtil._seti2cMoney(i)
        fstr = RMBUtil._setf2cMoney(f)
        if (istr.length == 0) {
          rstr = fstr
        } else {
          rstr = istr + '零' + fstr
        }
        rstr = rstr.replace(/零+/g, '零')
        return rstr
      }
    } else {
      return '---'
    }
  },

  _seti2cMoney: function (n) {
    var ns = n.toString()
    var tempstr = ''
    for (var i = 1; i < ns.length + 1; i++) {
      switch (i) {
        case 1:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '元' + tempstr
          } else {
            if (ns.length != 1) {
              tempstr = '元' + tempstr
            } else {
              tempstr = tempstr
            }
          }
          break
        case 2:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '拾' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 3:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '佰' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 4:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '仟' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 5:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '万' + tempstr
          } else {
            tempstr = '万' + tempstr
          }
          break
        case 6:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '拾' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 7:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '佰' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 8:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '仟' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 9:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '亿' + tempstr
          } else {
            tempstr = '亿' + tempstr
          }
          break
        case 10:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '拾' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 11:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '佰' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 12:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '仟' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 13:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '万' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        default:
          break
      }
    }
    return RMBUtil._g2b(tempstr)
  },

  _setf2cMoney: function (n) {
    var ns = n.toString()
    var tempstr = ''
    for (var i = 0; i < ns.length; i++) {
      switch (i) {
        case 0:
          var t = ns.substr(i, 1)
          if (t != '0') {
            tempstr += t + '角'
          }
          break
        case 1:
          var t = ns.substr(i, 1)
          if (t != '0') {
            tempstr += t + '分'
          }
          break
        default:
          break
      }
    }
    return RMBUtil._g2b(tempstr)
  },
  _seti2c: function (n) {
    var ns = n.toString()
    var tempstr = ''
    for (var i = 1; i < ns.length + 1; i++) {
      switch (i) {
        case 1:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + tempstr
          } else {
            tempstr = tempstr
          }
          break
        case 2:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '拾' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 3:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '佰' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 4:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '仟' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 5:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '万' + tempstr
          } else {
            tempstr = '万' + tempstr
          }
          break
        case 6:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '拾' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 7:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '佰' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 8:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '仟' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 9:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '亿' + tempstr
          } else {
            tempstr = '亿' + tempstr
          }
          break
        case 10:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '拾' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 11:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '佰' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        case 12:
          var t = ns.substr(ns.length - i, 1)
          if (t != '0') {
            tempstr = t + '仟' + tempstr
          } else {
            tempstr = '0' + tempstr
          }
          break
        default:
          break
      }
    }
    return RMBUtil._g2b(tempstr)
  },

  _setf2c: function (n) {
    var ns = n.toString()
    var tempstr = ''
    for (var i = 0; i < ns.length; i++) {
      switch (i) {
        case 0:
          var t = ns.substr(i, 1)
          if (t != '0') {
            tempstr += t
          } else {
            tempstr += '0'
          }
          break
        case 1:
          var t = ns.substr(i, 1)
          if (t != '0') {
            tempstr += t
          }
          break
        case 2:
          var t = ns.substr(i, 1)
          if (t != '0') {
            tempstr += t
          }
          break
        case 3:
          var t = ns.substr(i, 1)
          if (t != '0') {
            tempstr += t
          }
          break
        default:
          break
      }
    }
    return RMBUtil._g2b(tempstr)
  },

  _g2b: function (s) {
    var rs = s.replace(/0+/g, '0')
    rs = rs.replace('0元', '元')
    rs = rs.replace('0亿', '亿')
    rs = rs.replace('0万', '万')
    rs = rs.replace('亿万', '亿')
    rs = rs.replace(/0/g, '零')
    rs = rs.replace(/1/g, '壹')
    rs = rs.replace(/2/g, '贰')
    rs = rs.replace(/3/g, '叁')
    rs = rs.replace(/4/g, '肆')
    rs = rs.replace(/5/g, '伍')
    rs = rs.replace(/6/g, '陆')
    rs = rs.replace(/7/g, '柒')
    rs = rs.replace(/8/g, '捌')
    rs = rs.replace(/9/g, '玖')
    return rs
  }
}
