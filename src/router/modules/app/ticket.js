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
  }
]
