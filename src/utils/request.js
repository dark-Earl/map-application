import axios from 'axios'
import { Modal, message } from 'ant-design-vue'

import { getToken, removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: window.BASE_API_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    let token = getToken()
    if (token !== undefined) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Access-Token'] = token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const basePath = window.BASE_URL

    if (typeof res === 'string') {
      return res
    }

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      let errorTip = response.config.closeErrorTip
      if (errorTip !== true && (res.code !== 401 && res.code !== 402)) {
        //增加开户 绑卡 风险测评 充值 合格投资者申请 弹窗跳转操作
        switch (res.data){
          case 'kh':
            Modal.confirm({
              title: '温馨提示',
              content: res.msg,
              onOk () {
                location.href = basePath + 'auth.html#/psncert'
              }
            })
            break
          case 'fxcp':
            Modal.confirm({
              title: '温馨提示',
              content: res.msg,
              onOk () {
                location.href = basePath + 'zhzx.html#/fxcp'
              }
            })
            break
          case 'bindCard':
            Modal.confirm({
              title: '温馨提示',
              content: res.msg,
              onOk () {
                location.href = basePath + 'zhzx.html#/bindCard01'
              }
            })
            break
          case 'jyje':
            Modal.confirm({
              title: '温馨提示',
              content: res.msg,
              onOk () {
                location.href = basePath + 'zhzx.html#/cz'
              }
            })
            break
          case 'hgtzz':
            Modal.confirm({
              title: '温馨提示',
              content: res.msg,
              onOk () {
                location.href = basePath + 'investBusi.html#/hgtzzGr'
              }
            })
            break
          default:
            message.error({
              content: res.msg || '错误',
              duration: 5
            })
            break
        }
      }
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401) {
        // to re-login
        Modal.warning({
          closable: true,
          title: '登录超时',
          okText: '确认',
          content: '您的登录会话已经过期，请重新登录',
          onOk: function () {
            // todo 不需要刷新token
            // store.dispatch('user/resetToken').then(() => {
            //   location.reload()
            // })
            // location.reload()
            localStorage.setItem('isLogin', 'false')
            localStorage.setItem('role', '')
            removeToken()
            location.href = basePath + 'login.html'
          }
        })
      } else if (res.code === 402) {
        // to re-login
        Modal.warning({
          closable: true,
          title: '登录超时',
          okText: '确认',
          content: '您的账号已在其他设备登陆',
          onOk: function () {
            // todo 不需要刷新token
            // store.dispatch('user/resetToken').then(() => {
            //   location.reload()
            // })
            // location.reload()
            localStorage.setItem('isLogin', 'false')
            localStorage.setItem('role', '')
            removeToken()
            location.href = basePath + 'login.html'
          }
        })
      }
      // return Promise.reject(new Error(res.msg || 'Error'))
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    /*    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    }) */
    message.error({
      content: error.message,
      duration: 5
    })
    return Promise.reject(error)
  }
)

export default service
