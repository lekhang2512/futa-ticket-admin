function loadAppModules () {
  let packs = require.context('./app', true, /[A-Za-z0-9-_,\s]+\.js$/i)
  let modules = []
  packs.keys().forEach(key => {
    let matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      modules = [...modules, ...packs(key).default]
    }

  })
  return modules
}

let appModules = loadAppModules()
export default {
  path: '/',
  component: () => import('@/Auth'),
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        title: {
          i18n: 'title.dashboard'
        },
        require_auth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/Show.vue'),
      meta: {
        title: {
          i18n: 'title.profile'
        },
        require_auth: true
      }
    },
    ...appModules
  ]
}
