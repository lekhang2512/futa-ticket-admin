import router from '@/router'
import i18n from '@/i18n'
import { forIn } from 'lodash'

/**
 * state
 */
const state = {
}

/**
 * actions
 */
const actions = {
  handleResponse ({dispatch}, payload) {
    payload = payload || {}
    switch (payload.code) {
      case 401:
        dispatch('snackbar/showSnackBar', {
          color: 'warning',
          text: payload.data.message
        }, { root: true })
        break;
      case 403:
        dispatch('snackbar/showSnackBar', {
          color: 'warning',
          text: i18n.tc('errors.403')
        }, { root: true })
        router.push({ name: 'forbidden' }).catch(err => { err })
        break
      case 404:
        dispatch('snackbar/showSnackBar', {
          color: 'warning',
          text: i18n.tc('errors.404_api')
        }, { root: true })
        break
      case 422:
        let msg = []
        forIn(payload.data.errors, (err) => {
          if (typeof err === 'string') {
            msg.push('&bullet; ' + err)
          } else {
            msg.push('&bullet; ' + err[0])
          }
        })
        dispatch('snackbar/showSnackBar', {
          color: 'warning',
          text: msg.join('<br />')
        }, { root: true })
        break;
      case 423:
        dispatch('snackbar/showSnackBar', {
          color: 'warning',
          text: payload.data.message
        }, { root: true })
        break;
      case 500:
        dispatch('snackbar/showSnackBar', {
          color: 'warning',
          text: i18n.tc('errors.internal_server')
        }, { root: true })
        router.push({ name: 'opps' })
        break
      default:
        dispatch('snackbar/showSnackBar', {
          color: 'warning',
          text: i18n.tc('errors.internal_server')
        }, { root: true })
      break;
    }
  }
}

/**
 * mutations
 */
const mutations = {
}

/**
 * getters
 */
const getters = {
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
