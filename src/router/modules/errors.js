export default {
  path: '/errors',
  component: () => import('@/App'),
  children: [
    {
      path: '/403',
      meta: {
        title: {
          i18n: 'title.403'
        },
      },
      name: 'forbidden',
      component: () => import('@/views/errors/403.vue')
    },
    {
      path: '/404',
      meta: {
        title: {
          i18n: 'title.404'
        },
      },
      name: 'not_found',
      component: () => import('@/views/errors/404.vue')
    },
    {
      path: '/500',
      meta: {
        title: {
          i18n: 'title.500'
        },
      },
      name: 'opps',
      component: () => import('@/views/errors/500.vue')
    }
  ]
}
