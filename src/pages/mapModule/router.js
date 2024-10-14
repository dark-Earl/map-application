import router from '../../router'
// 添加页面路由，"/" 为默认页面
router.addRoutes([
  {
    path: '/mapPlaces', // list
    component: () => import('@/pages/mapModule/views/mapPlaces'),
    name: 'mapPlaces',
    meta: {
      title: '地图名胜古迹',
      icon: ''
    }
  },
  {
    path: '/mapAnnotate',
    component: () => import('@/pages/mapModule/views/mapAnno'),
    name: 'mapAnnotate',
    meta: { title: '地图标注', icon: '' }
  },
  // {
  //   path: '/mapHome',
  //   component: () => import('@/pages/mapModule/views/mapHome'),
  //   name: 'mapHome',
  //   meta: { title: '地图引导页', icon: '' }
  // },
  {
    path: '/mapHome',
    component: () => import('@/pages/mapModule/views/mapAnno'),
    name: 'mapHome',
    meta: { title: '地图引导页', icon: '' }
  }

])
export default router
