export default [
  {
    path: '/ticket-types',
    name: 'ticket-type',
    component: () => import('@/views/ticketType/List.vue'),
    meta: {
      title: {
        i18n: 'title.ticket_type'
      },
      require_auth: true
    }
  },
  {
    path: '/ticket-types/create',
    name: 'ticket-type-create',
    component: () => import('@/views/ticketType/Create.vue'),
    meta: {
      title: {
        i18n: 'title.ticket_type_create'
      },
      require_auth: true
    }
  },
  {
    path: '/ticket-types/:id/update',
    name: 'ticket-type-update',
    component: () => import('@/views/ticketType/Update.vue'),
    meta: {
      title: {
        i18n: 'title.ticket_type_update'
      },
      require_auth: true
    }
  },
  {
    path: '/ticket-types/duplicate',
    name: 'ticket-type-duplicate',
    component: () => import('@/views/ticketType/Duplicate.vue'),
    meta: {
      title: {
        i18n: 'title.ticket_type_duplicate'
      },
      require_auth: true
    }
  }
]
