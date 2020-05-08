import {
  SET_USERS,
  SET_USER_DETAIL,
  SET_USERS_PAGINATION,
  SET_USERS_LOADING,
  SET_INITIAL_STATE
} from '../mutation-types'
import UserRepository from '@/repositories/user'
import i18n from '@/i18n'

const initState = () => {
  return {
    list: [],
    listLoading: false,
    pagination: {
      total: 0,
      count: 0,
      per_page: 20,
      current_page: 1,
      total_pages: 1,
    },
    detail: {}
  }
}
/**
 * state
 */
const state = {
  list: initState().list,
  listLoading: initState().listLoading,
  detail: initState().detail,
  pagination: initState().pagination,
}

/**
 * actions
 */
const actions = {
  async getByQuery ({ dispatch, commit }, payload) {
    let userRepo = (new UserRepository(window.axios))

    commit(SET_USERS_LOADING, true)
    let {success, response} = await userRepo.getByQuery(payload.query)
    commit(SET_USERS_LOADING, false)

    if (success) {
      commit(SET_USERS, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_USERS_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async getDetail ({ dispatch, commit }, payload) {
    let userRepo = (new UserRepository(window.axios))

    commit(SET_USERS_LOADING, true)
    let {success, response} = await userRepo.getDetail(payload.id, payload.query)
    commit(SET_USERS_LOADING, false)

    if (success) {
      commit(SET_USER_DETAIL, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_USERS_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async create ({ dispatch }, payload) {
    let userRepo = (new UserRepository(window.axios))
    let {success, response} = await userRepo.create(payload.data)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.user.create_success')
      }, { root: true })
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async update ({ dispatch }, payload) {
    let userRepo = (new UserRepository(window.axios))
    let {success, response} = await userRepo.update(payload.id, payload.data)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.user.update_success')
      }, { root: true })
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async delete ({ dispatch }, payload) {
    let query                     = payload.query || {}
    let userRepo = (new UserRepository(window.axios))
    let {success, response} = await userRepo.delete(payload.id, query)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.user.delete_success')
      }, { root: true })
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  }
}

/**
 * mutations
 */
const mutations = {
  [SET_USERS]: (state, list) => {
    state.list = list
  },
  [SET_USER_DETAIL]: (state, detail) => {
    state.detail = detail
  },
  [SET_USERS_LOADING]: (state, loading) => {
    state.listLoading = loading
  },
  [SET_USERS_PAGINATION]: (state, pagination) => {
    state.pagination = pagination
  },
  [SET_INITIAL_STATE]: (state) => {
    state.list = initState().list
    state.pagination = initState().pagination
  }
}

/**
 * getters
 */
const getters = {
  users: (state) => state.list,
  user: (state) => state.detail,
  usersLoading: (state) => state.listLoading,
  userPagination: (state) => state.pagination
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
