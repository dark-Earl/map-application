import request from '@/utils/request'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    login: false,
    isSmrz: false,
    username: '',
    mob: '',
    avatar: '',
    role: '',
    custName: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, name) => {
    state.username = name
  },
  SET_MOB: (state, mob) => {
    state.mob = mob
  },
  SET_RESETPWD: (state, resetpwd) => {
    state.resetpwd = resetpwd
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_LOGIN: (state, avatar) => {
    state.login = avatar
  },
  SET_SMRZ: (state, isSmrz) => {
    state.isSmrz = isSmrz
  },
  SET_CUSTNAME: (state, custName) => {
    state.custName = custName
  }
}

const actions = {
  /** user login
   * 调用参考：
   * this.$store.dispatch('user/login',{username: 'admin', password: "111111"}).then(() => {
        //回调成功跳转页面
        this.$router.push({ path: this.redirect || '/demo1-1' })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
   * @param commit
   * @param userInfo
   * @returns {Promise<unknown>}
   */
  /**
   * 忘记密码
   * @param commit
   * @returns {Promise<unknown>}
   */
  resetPwdCheckOne ({ commit }, params) {
    return new Promise((resolve, reject) => {
      ResetPwdCheckOne(params).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        setATicket(data.ATicket)
        const { mob, username } = data
        let param = {
          mob: mob,
          username: username
        }
        commit('SET_RESETPWD', param)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 获取临时Token
   * @param commit
   * @returns {Promise<unknown>}
   */
  getTempToken ({ commit }) {
    return new Promise((resolve, reject) => {
      getTempToken().then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('获取用户信息失败。')
        }
        const { username, mob, login, smrz, role, custName } = data
        commit('SET_USERNAME', username)
        commit('SET_MOB', mob)
        localStorage.setItem('isLogin', login ? 'true' : 'false')
        localStorage.setItem('role', role)
        commit('SET_LOGIN', login)
        commit('SET_SMRZ', smrz)
        commit('SET_ROLE', role)
        commit('SET_CUSTNAME', custName)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  updateToken ({ commit }, data) {
    return new Promise(resolve => {
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      resolve()
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      request({
        url: '/logout',
        method: 'post'
      }).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        localStorage.setItem('isLogin', 'false')
        localStorage.setItem('role', '')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  /**
   * this.$store.dispatch('user/serverLog', 'logType')
   * @param commit
   * @param state
   * @returns {Promise<unknown>}
   */
  serverLog ({ commit, state }, logType) {
    return new Promise((resolve, reject) => {
      UserLogHandle.serverLog(logType).then(response => {

      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
