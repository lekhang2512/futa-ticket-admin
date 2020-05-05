export default [
  {
    path: '/users',
    name: 'user',
    component: () => import('@/views/user/List.vue'),
    meta: {
      title: {
        i18n: 'title.user'
      },
      require_auth: true
    }
  },
  {
    path: '/users/create',
    name: 'user-create',
    component: () => import('@/views/user/Create.vue'),
    meta: {
      title: {
        i18n: 'title.user_create'
      },
      require_auth: true
    }
  },
  {
    path: '/users/update/:id',
    name: 'user-update',
    component: () => import('@/views/user/Update.vue'),
    meta: {
      title: {
        i18n: 'title.user_update'
      },
      require_auth: true
    }
  },
  {
    path: '/users/duplicate/:id',
    name: 'user-duplicate',
    component: () => import('@/views/user/Duplicate.vue'),
    meta: {
      title: {
        i18n: 'title.user_duplicate'
      },
      require_auth: true
    }
  }
]
