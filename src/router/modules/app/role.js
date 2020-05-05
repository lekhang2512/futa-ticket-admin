export default [
  {
    path: '/roles',
    name: 'role',
    component: () => import('@/views/role/List.vue'),
    meta: {
      title: {
        i18n: 'title.role'
      },
      require_auth: true
    }
  },
  {
    path: '/roles/create',
    name: 'role-create',
    component: () => import('@/views/role/Create.vue'),
    meta: {
      title: {
        i18n: 'title.role_create'
      },
      require_auth: true
    }
  },
  {
    path: '/roles/update/:id',
    name: 'role-update',
    component: () => import('@/views/role/Update.vue'),
    meta: {
      title: {
        i18n: 'title.role_update'
      },
      require_auth: true
    }
  },
  {
    path: '/roles/duplicate/:id',
    name: 'role-duplicate',
    component: () => import('@/views/role/Duplicate.vue'),
    meta: {
      title: {
        i18n: 'title.role_duplicate'
      },
      require_auth: true
    }
  }
]
