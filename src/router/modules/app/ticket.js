export default [
  {
    path: '/tickets',
    name: 'ticket',
    component: () => import('@/views/ticket/List.vue'),
    meta: {
      title: {
        i18n: 'title.ticket'
      },
      require_auth: true
    }
  },
  {
    path: '/tickets/create',
    name: 'ticket-create',
    component: () => import('@/views/ticket/Create.vue'),
    meta: {
      title: {
        i18n: 'title.ticket_create'
      },
      require_auth: true
    }
  },
  {
    path: '/tickets/:id/update',
    name: 'ticket-update',
    component: () => import('@/views/ticket/Update.vue'),
    meta: {
      title: {
        i18n: 'title.ticket_update'
      },
      require_auth: true
    }
  },
]
