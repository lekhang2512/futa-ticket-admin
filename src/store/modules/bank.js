import {
  SET_BANKS,
  SET_LOAD_BANK,
  SET_INITIAL_STATE
} from '../mutation-types'
import BankRepository from '@/repositories/bank'

const initState = () => {
  return {
    banks: [],
    loadBank: false
  }
}
/**
 * state
 */
const state = {
  banks: initState().banks,
  loadBank: initState().loadBank
}

/**
 * actions
 */
const actions = {
  async getBanks ({ dispatch, commit }, payload) {
    let bankRepo = (new BankRepository(window.axios))
    commit(SET_LOAD_BANK, true)
    let {success, response} = await bankRepo.getByQuery(payload.query)
    commit(SET_LOAD_BANK, false)
    if (success) {
      commit(SET_BANKS, response.data)
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
  [SET_BANKS]: (state, data) => {
    state.banks = data
  },
  [SET_LOAD_BANK]: (state, loading) => {
    state.loadBank = loading
  },
  [SET_INITIAL_STATE]: (state) => {
    state.banks = initState().banks
  }
}

/**
 * getters
 */
const getters = {
  banks: (state) => state.banks,
  loadBank: (state) => state.loadBank
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
