import {
  SET_USER,
  SET_PERMISSION,
  SET_GROUPS,
  SET_INITIAL_STATE
} from '../mutation-types'
import UserRepository from '@/repositories/user'
import TokenRepository from '@/repositories/token'
import SysRepository from '@/repositories/sys'
import router from '@/router'
import i18n from '@/i18n'
import { forEach } from 'lodash'

const initState = () => {
  return {
    user: {},
    permissions: {},
    groups: {},
    messageSuccess: {}
  }
}
/**
 * state
 */
const state = {
  user: initState().user,
  permissions: initState().permissions,
  groups: initState().groups,
  messageSuccess: initState().messageSuccess
}

/**
 * actions
 */
const actions = {
  async login ({ dispatch }, payload) {
    payload = payload || {}
    let credential = {
      username: payload.username,
      password: payload.password,
    }
    let userRepo = (new UserRepository(window.axios))
    let {success, response} = await userRepo.login(credential)

    if (success) {
      TokenRepository.setTokenToStorage(response.data)
      router.push({'name': 'dashboard'})

    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async logout ({dispatch}) {
    let userRepo = (new UserRepository(window.axios))
    let {success, response} = await userRepo.logout()

    if (success) {
      TokenRepository.removeTokenFromStorage()
      dispatch('resetState', {}, { root: true })
      router.push({'name': 'login'})
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async profile ({ dispatch, commit }) {
    let userRepo = (new UserRepository(window.axios))
    let query = { }
    let {success, response} = await userRepo.profile(query)
    if (success) {
      commit(SET_USER, response.data)
      dispatch('getPermissions', { root: true })
    } else {
      dispatch('api/handleResponse', response, { root: true })
      // if (response.code === 401) {
      //   dispatch('snackbar/showSnackBar', {
      //     color: 'warning',
      //     text: i18n.tc('errors.session_expired')
      //   }, { root: true })
      //   dispatch('auth/logout', {}, { root: true })
      // }
    }
  },
  async changeProfile ({dispatch, commit}, payload) {
    payload = payload || {}
    let userRepo = (new UserRepository(window.axios))
    let query = { include: 'debit' }
    let {success, response} = await userRepo.changeProfile(payload.data, query)
    if (success) {
      commit(SET_USER, response.data)

      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.profile.change_profile_success')
      }, { root: true })

      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async changePassword ({dispatch, commit}, payload) {
    payload = payload || {}
    let userRepo = (new UserRepository(window.axios))
    let query = payload.query || {}
    let {success, response} = await userRepo.changePassword(payload.data, query)
    if (success) {
      commit(SET_USER, response.data)

      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.profile.change_password_success')
      }, { root: true })

      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async getPermissions ({ dispatch, commit }, payload) {
    payload = payload || {}
    let syssRepo = (new SysRepository(window.axios))
    let query = payload.query || {}
    let {success, response} = await syssRepo.permissions(query)
    if (success) {
      commit(SET_PERMISSION, response.data)
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async getGroups ({ dispatch, commit }, payload) {
    payload = payload || {}
    let syssRepo = (new SysRepository(window.axios))
    let query = payload.query || {}
    let {success, response} = await syssRepo.groups(query)
    if (success) {
      commit(SET_GROUPS, response.data)
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async register ({ dispatch }, payload) {
    payload = payload || {}
    let userRepo = (new UserRepository(window.axios))
    let {success, response} = await userRepo.register(payload.data)

    if (success) {
      state.messageSuccess = response.data.message
      router.push({'name': 'success'}).catch(err => { err })

    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async changeAvatar ({dispatch, commit}, payload) {
    payload = payload || {}
    let userRepo = (new UserRepository(window.axios))
    let query = payload.query || {}
    let {success, response} = await userRepo.changeAvatar(payload.data, query)
    if (success) {
      commit(SET_USER, response.data)

      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.profile.change_avatar_success')
      }, { root: true })

      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async forgotPassword ({ dispatch }, payload) {
    payload = payload || {}

    let credential = {
      email: payload.email,
    }
    let userRepo = (new UserRepository(window.axios))
    let {success, response} = await userRepo.forgotPassword(credential)

    if (success) {
      state.messageSuccess = response.data.message
      router.push({'name': 'success'}).catch(err => { err })

    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  }
}

/**
 * mutations
 */
const mutations = {
  [SET_USER]: (state, user) => {
    state.user = user
  },
  [SET_PERMISSION]: (state, permissions) => {
    state.permissions = permissions
  },
  [SET_GROUPS]: (state, groups) => {
    state.groups = groups
  },
  [SET_INITIAL_STATE]: (state) => {
    state.user = initState().user
    state.permissions = initState().permissions
  }
}

/**
 * getters
 */
const getters = {
  user: (state) => state.user,
  permissions: (state) => state.permissions,
  groups: (state) => state.groups,
  selectFieldGroups: (state) => {
    let groups = []
    forEach(state.groups, (value, key) => {
      groups.push({
        code: key,
        name: value
      })
    })
    return groups
  },
  messageSuccess: (state) => state.messageSuccess
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
