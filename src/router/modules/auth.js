export default {
  path: '/',
  component: () => import('@/Guest.vue'),
  children: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
      meta: {
        title: {
          i18n: 'title.login'
        },
        guest: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      // component: () => import('@/views/auth/Login.vue'),
      meta: {
        title: {
          i18n: 'title.logout'
        },
        guest: true
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPassword.vue'),
      meta: {
        title: {
          i18n: 'title.forgot_password'
        },
        guest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/Register.vue'),
      meta: {
        title: {
          i18n: 'title.register'
        },
        guest: true
      }
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('@/views/auth/LayoutSuccess.vue'),
      meta: {
        title: {
          i18n: 'title.success'
        },
        guest: true
      }
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: () => import('@/views/VerifyEmail.vue'),
      meta: {
        title: {
          i18n: 'title.verify_email'
        },
        require_auth: true
      }
    }
  ]
}
