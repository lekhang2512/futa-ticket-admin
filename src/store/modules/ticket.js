import {
  SET_HELPERS,
  SET_TICKETS,
  SET_TICKET_DETAIL,
  SET_TICKETS_PAGINATION,
  SET_TICKETS_LOADING,
  SET_INITIAL_STATE
} from '../mutation-types'
import TicketRepository from '@/repositories/ticket'
import i18n from '@/i18n'
import { forEach } from 'lodash'

const initState = () => {
  return {
    helpers: {},
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
  helpers: initState().helpers,
  list: initState().list,
  listLoading: initState().listLoading,
  detail: initState().detail,
  pagination: initState().pagination
}

/**
 * actions
 */
const actions = {
  async getByQuery ({ dispatch, commit }, payload) {
    let ticketRepo = (new TicketRepository(window.axios))

    commit(SET_TICKETS_LOADING, true)
    let {success, response} = await ticketRepo.getByQuery(payload.query)
    commit(SET_TICKETS_LOADING, false)

    if (success) {
      commit(SET_TICKETS, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_TICKETS_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async getHelpers ({ dispatch, commit }, payload) {
    let ticketRepo = (new TicketRepository(window.axios))
    let {success, response} = await ticketRepo.getHelpers(payload.query)

    if (success) {
      commit(SET_HELPERS, response.data)
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async getDetail ({ dispatch, commit }, payload) {
    let ticketRepo = (new TicketRepository(window.axios))

    commit(SET_TICKETS_LOADING, true)
    let {success, response} = await ticketRepo.getDetail(payload.id, payload.query)
    commit(SET_TICKETS_LOADING, false)

    if (success) {
      commit(SET_TICKET_DETAIL, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_TICKETS_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async create ({ dispatch }, payload) {
    let ticketRepo = (new TicketRepository(window.axios))
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
    let ticketRepo = (new TicketRepository(window.axios))
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
  async progress ({ dispatch }, payload) {
    let ticketRepo = (new TicketRepository(window.axios))
    let {success, response} = await ticketRepo.progress(payload.id)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('notify.change_status_success')
      }, { root: true })
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async resolved ({ dispatch }, payload) {
    let ticketRepo = (new TicketRepository(window.axios))
    let {success, response} = await ticketRepo.resolved(payload.id)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('notify.change_status_success')
      }, { root: true })
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async close ({ dispatch }, payload) {
    let ticketRepo = (new TicketRepository(window.axios))
    let {success, response} = await ticketRepo.close(payload.id)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('notify.close_success')
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
  [SET_HELPERS]: (state, payload) => {
    state.helpers = payload
  },
  [SET_TICKETS]: (state, payload) => {
    state.list = payload
  },
  [SET_TICKET_DETAIL]: (state, payload) => {
    state.detail = payload
  },
  [SET_TICKETS_LOADING]: (state, payload) => {
    state.listLoading = payload
  },
  [SET_TICKETS_PAGINATION]: (state, payload) => {
    state.pagination = payload
  },
  [SET_INITIAL_STATE]: (state) => {
    state.helpers = initState().helpers
    state.list = initState().list
    state.detail = initState().detail
    state.listLoading = initState().listLoading
    state.pagination = initState().pagination
  }
}

/**
 * getters
 */
const getters = {
  helpers: (state) => state.helpers,
  tickets: (state) => state.list,
  ticketsLoading: (state) => state.listLoading,
  ticket: (state) => state.detail,
  ticketPagination: (state) => state.pagination,
  statuses: (state) => {
    if (state.helpers && state.helpers.statuses) {
      let helpers = [];
      forEach(state.helpers.statuses, (value, key) => {
        helpers.push({
          code: key,
          name: value
        })
      })
      return helpers
    }
    return []
  },
  priorities: (state) => {
    if (state.helpers && state.helpers.priorities) {
      let helpers = [];
      forEach(state.helpers.priorities, (value, key) => {
        helpers.push({
          code: parseInt(key),
          name: value
        })
      })
      return helpers
    }
    return []
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
