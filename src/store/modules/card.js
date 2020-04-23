import {
  SET_CARDS,
  SET_CARDS_PAGINATION,
  SET_CARDS_LOADING,
  SET_INITIAL_STATE
} from '../mutation-types'
import CardRepository from '@/repositories/card'
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
    detail: []
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
    let cardRepo = (new CardRepository(window.axios))

    commit(SET_CARDS_LOADING, true)
    let {success, response} = await cardRepo.getByQuery(payload.query)
    commit(SET_CARDS_LOADING, false)

    if (success) {
      commit(SET_CARDS, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_CARDS_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async create ({ dispatch }, payload) {
    let cardRepo = (new CardRepository(window.axios))
    let {success, response} = await cardRepo.create(payload.data, payload.query)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.card.create_success')
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
  [SET_CARDS]: (state, list) => {
    state.list = list
  },
  [SET_CARDS_LOADING]: (state, loading) => {
    state.listLoading = loading
  },
  [SET_CARDS_PAGINATION]: (state, pagination) => {
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
  cards: (state) => state.list,
  cardsLoading: (state) => state.listLoading,
  card: (state) => state.detail,
  cardPagination: (state) => state.pagination
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
