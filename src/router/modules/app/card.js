export default [
  {
    path: '/cards',
    name: 'card',
    component: () => import('@/views/card/List.vue'),
    meta: {
      title: {
        i18n: 'title.card'
      },
      require_auth: true
    }
  },
  {
    path: '/cards/create',
    name: 'card-create',
    component: () => import('@/views/card/Create.vue'),
    meta: {
      title: {
        i18n: 'title.card_create'
      },
      require_auth: true
    }
  }
]
