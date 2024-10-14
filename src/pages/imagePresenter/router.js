import router from '../../router'
// 添加页面路由，"/" 为默认页面
router.addRoutes([
  {
    path: '/imgIndexShow1',
    meta: { title: '图片展示1', icon: '', needLogin: false},
    component: () => import('@/pages/imagePresenter/views/imgIndexShow1.vue')
  },
  {
    path: '/imgShowCook',
    meta: { title: '烟火随笔', icon: '', needLogin: false},
    component: () => import('@/pages/imagePresenter/views/imgShowCook.vue')
  },
  {
    path: '/imgShowCookAug',
    meta: { title: '烟火随笔八月', icon: '', needLogin: false},
    component: () => import('@/pages/imagePresenter/views/imgShowCookAug.vue')
  },
])
export default router
