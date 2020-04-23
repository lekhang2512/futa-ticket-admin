import {
  SET_CONFIGS,
  SET_CONFIGS_PAGINATION,
  SET_CONFIGS_LOADING,
  SET_INITIAL_STATE
} from '../mutation-types'
import ConfigRepository from '@/repositories/config'

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
    }
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
  async getConfig ({ dispatch, commit }, payload) {
    let query = payload.query || {}
    let configRepo = (new ConfigRepository(window.axios))

    commit(SET_CONFIGS_LOADING, true)
    let {success, response} = await configRepo.getByQuery(query)
    commit(SET_CONFIGS_LOADING, false)

    if (success) {
      commit(SET_CONFIGS, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_CONFIGS_PAGINATION, response.meta.pagination )
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
  [SET_CONFIGS]: (state, list) => {
    state.list = list
  },
  [SET_CONFIGS_LOADING]: (state, loading) => {
    state.listLoading = loading
  },
  [SET_CONFIGS_PAGINATION]: (state, pagination) => {
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
  configs: (state) => state.list,
  configsLoading: (state) => state.listLoading,
  configPagination: (state) => state.pagination
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
