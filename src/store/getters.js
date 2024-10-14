
/**
 *
 * getters 对象声明，对应 modules/*.js 中的 state 对象引用
 */
const getters = {

  token: state => state.user.token,
  username: state => state.user.username,
  mob: state => state.user.mob,
  login: state => state.user.login,
  isSmrz: state => state.user.isSmrz,
  custName: state => state.user.custName,
  role: state => state.user.role,
  resetpwd: state => state.user.resetpwd
}
export default getters
