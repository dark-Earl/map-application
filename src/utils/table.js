/**
 * 表格工具类
 */
export default {
  /**
   * 初始化查询数据
   * @param role
   * @param colums
   * @returns {*}
   */
  initColums (role, colums) {
    if (role === 'Investor') { //此处判断不用用户类型是否有有对应的列权限
      colums = colums.filter(col => col.dataIndex !== 'KHH')
      colums = colums.filter(col => col.dataIndex !== 'KHXM')
    }
    return colums
  }
}
