import router from '../../router'
// 添加页面路由，"/" 为默认页面
router.addRoutes([
  {
    path: '/sector',
    component: () => import('@/pages/fundDataDisplay/views/index/sector.vue'),
    name: 'sector',
    meta: { title: '行业板块', icon: '' }
  },
])
export default router
