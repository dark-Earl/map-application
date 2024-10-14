import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/auth'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // {
  //   path: '/bak',
  //   component: () => import('@/pages/bak/views/helloWorld/HelloWorld')
  // },
  // {
  //   path: '/liquidfill',
  //   component: () => import('@/pages/test/views/index/Index')
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  /*    mode: 'hash',*/
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 路由守卫
router.beforeEach((to, from, next) => {
  // to要跳转到的路径
  // from从哪个路径来
  // next往下执行的回调
  to.meta.title = '小练笔'
  if(to.meta.needLogin){
    // // 在localStorage中获取登录标志
    // let isLogin = localStorage.getItem('isLogin')
    //从cookie中获取登录标志
    let isLogin = localStorage.getItem('isLogin')
    let role = localStorage.getItem('role')
    if(isLogin != 'true') {
      //未登录
      location.href = window.BASE_URL + 'login.html#/?reqUri=' + encodeURIComponent(location.pathname + location.hash)
    }else if(isLogin === 'true' && (to.name === '登录' || to.name === 'zhzx')){
      //已登录跳转的页面时登录页或者账户中心页面进行判断进入对应的账户中心
      if (role == 'Tourist') {
        location.href = window.BASE_URL + 'handle.html#/ywbl'
      } else {
        next({ path: '/lczx' })
      }
    }else{
      //正常页面增加角色判断
      if (to.meta.roles != null && to.meta.roles.length !== 0) {
        for (let i = 0; i < to.meta.roles.length; i++) {
          if (role == to.meta.roles[i]) {
            next()
            break
          } else if (i == to.meta.roles.length - 1) {
            next({ path: '/404' })
          }
        }
      } else {
        next()
      }
    }
  }else {
    // 如果不需要登录，则直接跳转到对应页面
    if (to.meta.isInfoTab) {
      router.push({
        query: {
          id: to.meta.isInfoTab
        }
      })
    }
    next()
  }
})


//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
//push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};

export default router
