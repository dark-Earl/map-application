import accounting from 'accounting'

export function convertNumberToChinesePrice(number,unit) {
  number = String(number);
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  var cnInteger = '整';
  //整型完以后的单位
  var cnIntLast = '元';
  if (unit) {
    cnIntLast = unit;
  }
  //最大处理的数字
  var maxNum = 9999999999999999.9999;
  var maxLength = 14;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';
  //分离金额后用的数组，预定义
  var parts;
  if (number == '') { return ''; }
  var currentLength;
  if (number.indexOf('.') === -1) {
    currentLength = number.length;
  }else {
    var index = number.indexOf('.');
    currentLength = number.substring(0,index).length;
  }
  if (currentLength > maxLength) {
    //超出最大处理数字
    return '超出最大限制';
  }
  if (number == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  if (number.indexOf('.') == -1) {
    integerNum = number;
    decimalNum = '';
  } else {
    parts = number.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

export default {
  /**
   * 金额转换格式
   * @param value
   * @returns {[]|*}
   */
  moneyFormat (value, decimal) {
    if (value) {
      return accounting.formatMoney(value, '', decimal)
    }
    return value
  },
  numFormat (value, Fixed) {
    if (value) {
      return Number(value).toFixed(Fixed)
    }
    return value
  },
  /**
   * 保留小数点，尾数四舍五入
   * @param value
   * @param Fixed
   * @returns {number}
   */
  numRound (value, Fixed){

    let realVal = Number(value).toFixed(Fixed)

    return Number(realVal)
  },
  /**
   * 保留小数点，尾数不四舍五入
   * @param value
   * @param Fixed
   * @returns {number}
   */
  numSub (value, Fixed){

    // 截取当前数据到小数点后三位

    let transformVal = Number(value).toFixed(Fixed)

    let realVal = transformVal.substring(0, transformVal.length - 1)

    // num.toFixed(3)获取的是字符串

    return Number(realVal)

  },

  /**
   * 日期显示字段格式调整
   */
  dateFormat (value, spacer){
    let result = value
    if(typeof value =='string'&&value.length==8){
      result = value.substr(0,4)+spacer+value.substr(4,2)+spacer+value.substr(6,2)
    }
    return result
  },
  getDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    return tYear + '-' + tMonth + '-' + tDate;
  },
  doHandleMonth(month) {
    var m = month;
    if (month.toString().length === 1) {
      m = "0" + month;
    }
    return m;
  }
}
