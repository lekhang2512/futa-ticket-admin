import {
  SET_TICKET_TYPES,
  SET_TICKET_TYPE_DETAIL,
  SET_TICKET_TYPES_PAGINATION,
  SET_TICKET_TYPES_LOADING,
  SET_INITIAL_STATE
} from '../mutation-types'
import TicketTypeRepository from '@/repositories/ticketType'
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
    let ticketTypeRepo = (new TicketTypeRepository(window.axios))

    commit(SET_TICKET_TYPES_LOADING, true)
    let {success, response} = await ticketTypeRepo.getByQuery(payload.query)
    commit(SET_TICKET_TYPES_LOADING, false)

    if (success) {
      commit(SET_TICKET_TYPES, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_TICKET_TYPES_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async getDetail ({ dispatch, commit }, payload) {
    let ticketTypeRepo = (new TicketTypeRepository(window.axios))

    commit(SET_TICKET_TYPES_LOADING, true)
    let {success, response} = await ticketTypeRepo.getDetail(payload.query)
    commit(SET_TICKET_TYPES_LOADING, false)

    if (success) {
      commit(SET_TICKET_TYPE_DETAIL, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_TICKET_TYPES_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async create ({ dispatch }, payload) {
    let ticketRepo = (new TicketTypeRepository(window.axios))
    let {success, response} = await ticketRepo.create(payload.data)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('notify.create_success')
      }, { root: true })
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async update ({ dispatch }, payload) {
    let ticketRepo = (new TicketTypeRepository(window.axios))
    let {success, response} = await ticketRepo.update(payload.id, payload.data)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('notify.update_success')
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
    let ticketTypeRepo = (new TicketTypeRepository(window.axios))
    let {success, response} = await ticketTypeRepo.delete(payload.id, query)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('notify.delete_success')
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
  [SET_TICKET_TYPES]: (state, list) => {
    state.list = list
  },
  [SET_TICKET_TYPE_DETAIL]: (state, detail) => {
    state.detail = detail
  },
  [SET_TICKET_TYPES_LOADING]: (state, loading) => {
    state.listLoading = loading
  },
  [SET_TICKET_TYPES_PAGINATION]: (state, pagination) => {
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
  ticketTypes: (state) => state.list,
  ticketType: (state) => state.detail,
  ticketTypeLoading: (state) => state.listLoading,
  ticketTypePagination: (state) => state.pagination
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
