import {
  SET_PERMISSIONS,
  SET_PERMISSION_DETAIL,
  SET_PERMISSIONS_PAGINATION,
  SET_PERMISSIONS_LOADING,
  SET_INITIAL_STATE
} from '../mutation-types'
import PermissionRepository from '@/repositories/permission'
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
    let permissionRepo = (new PermissionRepository(window.axios))

    commit(SET_PERMISSIONS_LOADING, true)
    let {success, response} = await permissionRepo.getByQuery(payload.query)
    commit(SET_PERMISSIONS_LOADING, false)

    if (success) {
      commit(SET_PERMISSIONS, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_PERMISSIONS_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async getDetail ({ dispatch, commit }, payload) {
    let permissionRepo = (new PermissionRepository(window.axios))

    commit(SET_PERMISSIONS_LOADING, true)
    let {success, response} = await permissionRepo.getDetail(payload.query)
    commit(SET_PERMISSIONS_LOADING, false)

    if (success) {
      commit(SET_PERMISSION_DETAIL, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_PERMISSIONS_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async create ({ dispatch }, payload) {
    let permissionRepo = (new PermissionRepository(window.axios))
    let {success, response} = await permissionRepo.create(payload.data)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.permission.create_success')
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
    let permissionRepo = (new PermissionRepository(window.axios))
    let {success, response} = await permissionRepo.delete(payload.id, query)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.permission.delete_success')
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
  [SET_PERMISSIONS]: (state, list) => {
    state.list = list
  },
  [SET_PERMISSION_DETAIL]: (state, detail) => {
    state.detail = detail
  },
  [SET_PERMISSIONS_LOADING]: (state, loading) => {
    state.listLoading = loading
  },
  [SET_PERMISSIONS_PAGINATION]: (state, pagination) => {
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
  permissions: (state) => state.list,
  permission: (state) => state.detail,
  permissionsLoading: (state) => state.listLoading,
  permissionPagination: (state) => state.pagination
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
