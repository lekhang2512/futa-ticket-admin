import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '@/i18n'
import errorRouter from './modules/errors'
import authRouter from './modules/auth'
import appRouter from './modules/app'
import TokenRepository from '@/repositories/token'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      require_auth: true
    }
  },
  authRouter,
  appRouter,
  errorRouter,
  {
    path: '/*',
    name: 'notfound',
    meta: {
      title: {
        i18n: 'title.404'
      },
    },
    component: () => import('@/views/errors/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

router.beforeEach(async (to, from, next) => {
  document.title = itemTitle(to.meta)
  let auth = TokenRepository.getTokenFromStorate() || null
  if (auth) {
    await fetchUserInfo(auth)

    // if (to.name !== 'verify-email' && !store.state.auth.user.email_verified_at) {
    //   next({
    //     name: 'verify-email'
    //   })
    // }

    // await fetchPermisson(auth)

    next()
    // if (to.matched.some(record => record.meta.require_auth)) {
    //   next()
    // } else {
    //   next({
    //     name: 'dashboard'
    //   })
    // }
  } else {
    if (to.matched.some(record => record.meta.require_auth)) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  }
})

function itemTitle (item) {
  if (typeof item.title === 'object') {
    return i18n.tc(item.title.i18n)
  } else {
    return item.title
  }
}

async function fetchUserInfo (auth) {
  if (auth && !store.state.auth.user.id) {
    await store.dispatch('auth/profile', {})
  }
}

// async function fetchPermisson (auth) {
//   if (auth && !Object.keys(store.state.auth.permissions).length) {
//     await store.dispatch('auth/getPermissions', {})
//   }
// }

export default router
