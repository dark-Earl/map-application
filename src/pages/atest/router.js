import router from '../../router'
// 添加页面路由，"/" 为默认页面
router.addRoutes([
  {
    path: '/test1',
    meta: { title: '测试文件1', icon: '', needLogin: false},
    component: () => import('@/pages/atest/views/test1')
  },
  {
    path: '/test2',
    meta: { title: '测试文件2', icon: '', needLogin: false},
    component: () => import('@/pages/atest/views/test2')
  },
  {
    path: '/interfaceTest',
    meta: { title: '接口测试', icon: '', needLogin: false},
    component: () => import('@/pages/atest/views/interfaceTestNew')
  },
  {
    path: '/interfaceTestOld',
    meta: { title: '接口测试', icon: '', needLogin: false},
    component: () => import('@/pages/atest/views/interfaceTestOld')
  },
  {
    path: '/antVueTest',
    meta: { title: '组件测试', icon: '', needLogin: false},
    component: () => import('@/pages/atest/views/antVueTest')
  },
  {
    path: '/test',
    meta: { title: '组件测试', icon: '', needLogin: false},
    component: () => import('@/pages/atest/test/test')
  },
])
export default router
