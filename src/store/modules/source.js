import {
  SET_SOURCES,
  SET_SOURCE_DETAIL,
  SET_SOURCES_PAGINATION,
  SET_SOURCES_LOADING,
  SET_INITIAL_STATE
} from '../mutation-types'
import SourceRepository from '@/repositories/source'
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
    let sourceRepo = (new SourceRepository(window.axios))

    commit(SET_SOURCES_LOADING, true)
    let {success, response} = await sourceRepo.getByQuery(payload.query)
    commit(SET_SOURCES_LOADING, false)

    if (success) {
      commit(SET_SOURCES, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_SOURCES_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async getDetail ({ dispatch, commit }, payload) {
    let sourceRepo = (new SourceRepository(window.axios))

    commit(SET_SOURCES_LOADING, true)
    let {success, response} = await sourceRepo.getDetail(payload.query)
    commit(SET_SOURCES_LOADING, false)

    if (success) {
      commit(SET_SOURCE_DETAIL, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_SOURCES_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async create ({ dispatch }, payload) {
    let sourceRepo = (new SourceRepository(window.axios))
    let {success, response} = await sourceRepo.create(payload.data)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.source.create_success')
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
    let sourceRepo = (new SourceRepository(window.axios))
    let {success, response} = await sourceRepo.delete(payload.id, query)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.source.delete_success')
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
  [SET_SOURCES]: (state, list) => {
    state.list = list
  },
  [SET_SOURCE_DETAIL]: (state, detail) => {
    state.detail = detail
  },
  [SET_SOURCES_LOADING]: (state, loading) => {
    state.listLoading = loading
  },
  [SET_SOURCES_PAGINATION]: (state, pagination) => {
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
  sources: (state) => state.list,
  source: (state) => state.detail,
  sourcesLoading: (state) => state.listLoading,
  sourcePagination: (state) => state.pagination
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
