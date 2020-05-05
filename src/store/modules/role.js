import {
  SET_ROLES,
  SET_ROLE_DETAIL,
  SET_ALL_ROLES,
  SET_ROLES_PAGINATION,
  SET_ROLES_LOADING,
  SET_INITIAL_STATE
} from '../mutation-types'
import RoleRepository from '@/repositories/role'
import i18n from '@/i18n'

const initState = () => {
  return {
    list: [],
    full_list: [],
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
  full_list: initState().full_list,
  listLoading: initState().listLoading,
  detail: initState().detail,
  pagination: initState().pagination,
}

/**
 * actions
 */
const actions = {
  async getByQuery ({ dispatch, commit }, payload) {
    let roleRepo = (new RoleRepository(window.axios))

    commit(SET_ROLES_LOADING, true)
    let {success, response} = await roleRepo.getByQuery(payload.query)
    commit(SET_ROLES_LOADING, false)

    if (success) {
      commit(SET_ROLES, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_ROLES_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async getAll ({ dispatch, commit }, payload) {
    let roleRepo = (new RoleRepository(window.axios))

    let {success, response} = await roleRepo.getByQuery({limit: -1})

    if (success) {
      commit(SET_ALL_ROLES, response.data)
      if (payload && payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async getDetail ({ dispatch, commit }, payload) {
    let roleRepo = (new RoleRepository(window.axios))

    commit(SET_ROLES_LOADING, true)
    let {success, response} = await roleRepo.getDetail(payload.id, payload.query)
    commit(SET_ROLES_LOADING, false)

    if (success) {
      commit(SET_ROLE_DETAIL, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_ROLES_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async create ({ dispatch }, payload) {
    let roleRepo = (new RoleRepository(window.axios))
    let {success, response} = await roleRepo.create(payload.data)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.role.create_success')
      }, { root: true })
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async update ({ dispatch }, payload) {
    let roleRepo = (new RoleRepository(window.axios))
    let {success, response} = await roleRepo.update(payload.id, payload.data)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.role.update_success')
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
    let roleRepo = (new RoleRepository(window.axios))
    let {success, response} = await roleRepo.delete(payload.id, query)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.role.delete_success')
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
  [SET_ROLES]: (state, list) => {
    state.list = list
  },
  [SET_ALL_ROLES]: (state, data) => {
    state.full_list = data
  },
  [SET_ROLE_DETAIL]: (state, detail) => {
    state.detail = detail
  },
  [SET_ROLES_LOADING]: (state, loading) => {
    state.listLoading = loading
  },
  [SET_ROLES_PAGINATION]: (state, pagination) => {
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
  roles: (state) => state.list,
  all_roles: (state) => state.full_list,
  role: (state) => state.detail,
  rolesLoading: (state) => state.listLoading,
  rolePagination: (state) => state.pagination
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
