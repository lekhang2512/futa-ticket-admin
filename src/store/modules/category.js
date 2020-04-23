import {
  SET_CATEGORIES,
  SET_CATEGORIES_LOADING,
  SET_ATTRIBUTES,
  SET_ATTRIBUTES_LOADING,
  SET_INITIAL_STATE
} from '../mutation-types'
import CategoryRepository from '@/repositories/category'

const initState = () => {
  return {
    categories: [],
    cateLoading: false,
    attributes: [],
    attLoading: false
  }
}
/**
 * state
 */
const state = {
  categories: initState().categories,
  cateLoading: initState().cateLoading,
  attributes: initState().attributes,
  attLoading: initState().attLoading,
}

/**
 * actions
 */
const actions = {
  async getList ({ dispatch, commit }, payload) {
    let categoryRepo = (new CategoryRepository(window.axios))

    commit(SET_CATEGORIES_LOADING, true)
    let {success, response} = await categoryRepo.getByQuery(payload.query)
    commit(SET_CATEGORIES_LOADING, false)

    if (success) {
      commit(SET_CATEGORIES, response.data)
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },

  async getAttributesByCateID ({ dispatch, commit }, payload) {
    let categoryRepo = (new CategoryRepository(window.axios))

    commit(SET_ATTRIBUTES_LOADING, true)
    let {success, response} = await categoryRepo.getAttributesByCateID(payload.query)
    commit(SET_ATTRIBUTES_LOADING, false)

    if (success) {
      commit(SET_ATTRIBUTES, response.data)
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
  [SET_CATEGORIES]: (state, payload) => {
    state.categories = payload
  },
  [SET_CATEGORIES_LOADING]: (state, payload) => {
    state.cateLoading = payload
  },
  [SET_ATTRIBUTES]: (state, payload) => {
    state.attributes = payload
  },
  [SET_ATTRIBUTES_LOADING]: (state, payload) => {
    state.attLoading = payload
  },
  [SET_INITIAL_STATE]: (state) => {
    state.categories = initState().categories
    state.cateLoading = initState().cateLoading
    state.attributes = initState().attributes
    state.attLoading = initState().attLoading
  }
}

/**
 * getters
 */
const getters = {
  categories: (state) => state.categories,
  cateLoading: (state) => state.cateLoading,
  attributes: (state) => state.attributes,
  attLoading: (state) => state.attLoading
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
