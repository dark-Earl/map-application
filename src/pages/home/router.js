import router from '../../router'
// 添加页面路由，"/" 为默认页面
router.addRoutes([
  {
    path: '/',
    meta: { title: '首页', icon: '' },
    component: () => import('@/layout/VerticalLayout'),
    children: [
      {
        path: '/',
        component: () => import('@/pages/home/views/index/Index'),
        name: 'index',
        meta: { title: '首页', icon: '' }
      },
      {
        path: '/qygz',
        component: () => import('@/pages/home/views/qygz'),
        name: 'qygz',
        meta: { title: '企业估值', icon: '' }
      }]
  }
])
export default router
