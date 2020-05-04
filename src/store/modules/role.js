import {
  SET_ROLES,
  SET_ROLES_PAGINATION,
  SET_ROLES_LOADING,
  SET_INITIAL_STATE
} from '../mutation-types'
import RoleRepository from '@/repositories/role'

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
    detail: []
  }
}
/**
 * state
 */
const state = {
  list: initState().list,
  listLoading: initState().listLoading,
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
  }
}

/**
 * mutations
 */
const mutations = {
  [SET_ROLES]: (state, list) => {
    state.list = list
  },
  [SET_ROLES_LOADING]: (state, loading) => {
    state.listLoading = loading
  },
  [SET_ROLES_PAGINATION]: (state, pagination) => {
    state.pagination = pagination
  },
  [SET_INITIAL_STATE]: (state) => {
    state.list = initState().list
    state.detail = initState().detail
    state.pagination = initState().pagination
  }
}

/**
 * getters
 */
const getters = {
  roles: (state) => state.list,
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
