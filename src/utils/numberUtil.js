export default{
  /**
   * 浮点数加法运算
   * @param arg1
   * @param arg2
   * @returns {number}
   */
  floatAdd (arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch(e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch(e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2)) ;
    //动态控制精度长度
    var  n = (r1 >= r2) ? r1: r2;
    var a = (arg1 * m + arg2 * m) / m ;
    return parseFloat(a.toFixed(n));
  },
  /**
   * 浮点数减法运算
   * @param arg1
   * @param arg2
   * @returns {number}
   */
  floatSub (arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch(e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch(e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1: r2;
    return parseFloat( ((arg1 * m - arg2 * m) / m).toFixed(n) );
  },
  /**
   * 浮点数乘法运算
   * @param arg1
   * @param arg2
   * @returns {number}
   */
  floatMul (arg1, arg2, n){
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length
    } catch(e) {}
    try {
      m += s2.split(".")[1].length
    } catch(e) {}


    var val =  Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);

    return parseFloat(val.toFixed(n))

  },
  /**
   * 浮点数除法运算
   * @param arg1
   * @param arg2
   * @returns {number}
   * @constructor
   */
  FloatDiv (arg1, arg2) {
    var t1 = 0,
      t2 = 0,
      r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length
    } catch(e) {}
    try {
      t2 = arg2.toString().split(".")[1].length
    } catch(e) {}

    r1 = Number(arg1.toString().replace(".", "")) ;
    r2 = Number(arg2.toString().replace(".", "")) ;
    return (r1 / r2) * Math.pow(10, t2 - t1);
  }
}
