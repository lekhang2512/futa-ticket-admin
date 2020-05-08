export default [
  {
    path: '/sources',
    name: 'source',
    component: () => import('@/views/source/List.vue'),
    meta: {
      title: {
        i18n: 'title.source'
      },
      require_auth: true
    }
  },
  {
    path: '/sources/create',
    name: 'source-create',
    component: () => import('@/views/source/Create.vue'),
    meta: {
      title: {
        i18n: 'title.source_create'
      },
      require_auth: true
    }
  },
  {
    path: '/sources/:id/update',
    name: 'source-update',
    component: () => import('@/views/source/Update.vue'),
    meta: {
      title: {
        i18n: 'title.source_update'
      },
      require_auth: true
    }
  },
  {
    path: '/sources/duplicate',
    name: 'source-duplicate',
    component: () => import('@/views/source/Duplicate.vue'),
    meta: {
      title: {
        i18n: 'title.source_duplicate'
      },
      require_auth: true
    }
  }
]
