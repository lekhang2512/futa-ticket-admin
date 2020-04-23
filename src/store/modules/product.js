import {
  SET_PRODUCTS,
  SET_PRODUCTS_PAGINATION,
  SET_PRODUCTS_LOADING,
  SET_PRODUCT,
  SET_INITIAL_STATE
} from '../mutation-types'
import ProductRepository from '@/repositories/product'
import { replaceString } from '@/utils'
import { forEach } from 'lodash'
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
  setProduct ({ commit }, payload) {
    commit(SET_PRODUCT, payload.product)
  },
  async getByQuery ({ dispatch, commit }, payload) {
    let productRepo = (new ProductRepository(window.axios))

    commit(SET_PRODUCTS_LOADING, true)
    let {success, response} = await productRepo.getByQuery(payload.query)
    commit(SET_PRODUCTS_LOADING, false)

    if (success) {
      if (response.data) {
        forEach(response.data, (value) => {
          value.template.data.description = replaceString(value.template.data.description, '\n', '<br/>')
          value.tab = null
        })
      }
      // commit(SET_PRODUCTS, response.data)
      if (response.meta && response.meta.pagination) {
        commit(SET_PRODUCTS_PAGINATION, response.meta.pagination )
      }
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async getDetail ({ dispatch, commit }, payload) {
    let productRepo = (new ProductRepository(window.axios))

    commit(SET_PRODUCTS_LOADING, true)
    let {success, response} = await productRepo.getDetail(payload.id, payload.query)
    commit(SET_PRODUCTS_LOADING, false)

    if (success) {
      response.data.template.data.description = replaceString(response.data.template.data.description, '\n', '<br/>')
      commit(SET_PRODUCT, response.data)
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async chooseToImport ({ dispatch }, payload) {
    let productRepo = (new ProductRepository(window.axios))

    let {success, response} = await productRepo.chooseToImport(payload.data)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: response.data
      }, { root: true })
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async update ({ dispatch }, payload) {
    let productRepo = (new ProductRepository(window.axios))

    let {success, response} = await productRepo.update(payload.id, payload.data)

    if (success) {
      dispatch('snackbar/showSnackBar', {
        color: 'success',
        text: i18n.tc('pages.product.update_success')
      }, { root: true })
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('api/handleResponse', response, { root: true })
    }
  },
  async create ({ dispatch }, payload) {
    let cardRepo = (new ProductRepository(window.axios))
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
  [SET_PRODUCTS]: (state, payload) => {
    state.list = payload
  },
  [SET_PRODUCT]: (state, payload) => {
    state.detail = payload
  },
  [SET_PRODUCTS_LOADING]: (state, payload) => {
    state.listLoading = payload
  },
  [SET_PRODUCTS_PAGINATION]: (state, payload) => {
    state.pagination = payload
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
  products: (state) => state.list,
  productsLoading: (state) => state.listLoading,
  product: (state) => state.detail,
  productPagination: (state) => state.pagination
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
