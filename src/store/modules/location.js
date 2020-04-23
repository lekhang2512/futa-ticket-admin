import {
  SET_COUNTRIES,
  SET_LOAD_COUNTRY,
  SET_CITIES,
  SET_LOAD_CITY,
  SET_DISTRICTS,
  SET_LOAD_DISTRICT,
  SET_WARDS,
  SET_LOAD_WARD,
  SET_INITIAL_STATE
} from '../mutation-types'
import CountryRepository from '@/repositories/country'
import CityRepository from '@/repositories/city'
import DistrictRepository from '@/repositories/district'
import WardRepository from '@/repositories/ward'
import i18n from '@/i18n'

const initState = () => {
  return {
    countries: [],
    loadCountry: false,
    cities: [],
    loadCity: false,
    districts: [],
    loadDistrict: false,
    wards: [],
    loadWard: false
  }
}
/**
 * state
 */
const state = {
  countries: initState().countries,
  loadCountry: initState().loadCountry,
  cities: initState().cities,
  loadCity: initState().loadCity,
  districts: initState().districts,
  loadDistrict: initState().loadDistrict,
  wards: initState().wards,
  loadWard: initState().loadWard
}

/**
 * actions
 */
const actions = {
  async getCountries ({ dispatch, commit }, payload) {
    payload = payload || {}
    let query = payload.query || {}
    let countryRepo = (new CountryRepository(window.axios))
    query.limit = -1
    query.sort = 'priority:1,name:1'
    commit(SET_LOAD_COUNTRY, true)
    let {success, response} = await countryRepo.getByQuery(query)
    commit(SET_LOAD_COUNTRY, false)
    if (success) {
      commit(SET_COUNTRIES, response.data)
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('snackbar/showSnackBar', {
        color: 'warning',
        text: i18n.tc('errors.internal_server')
      }, { root: true })
    }
  },
  async getCities ({ dispatch, commit }, payload) {
    payload = payload || {}
    let query = payload.query || {}
    let cityRepo = (new CityRepository(window.axios))
    query.limit = -1
    query.sort = 'is_branch:-1'
    commit(SET_LOAD_CITY, true)
    let {success, response} = await cityRepo.getByQuery(query)
    commit(SET_LOAD_CITY, false)
    if (success) {
      commit(SET_CITIES, response.data)
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('snackbar/showSnackBar', {
        color: 'warning',
        text: i18n.tc('errors.internal_server')
      }, { root: true })
    }
  },
  async getDistricts ({ dispatch, commit }, payload) {
    payload = payload || {}
    let query = payload.query || {}
    let districtRepo = (new DistrictRepository(window.axios))
    query.include = 'city,area'
    commit(SET_LOAD_DISTRICT, true)
    let {success, response} = await districtRepo.getByQuery(query)
    commit(SET_LOAD_DISTRICT, false)
    if (success) {
      commit(SET_DISTRICTS, response.data)
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('snackbar/showSnackBar', {
        color: 'warning',
        text: i18n.tc('errors.internal_server')
      }, { root: true })
    }
  },
  async getWards ({ dispatch, commit }, payload) {
    payload = payload || {}
    let query = payload.query || {}
    let wardRepo = (new WardRepository(window.axios))
    query.limit = -1
    query.include = 'district'
    commit(SET_LOAD_WARD, true)
    let {success, response} = await wardRepo.getByQuery(query)
    commit(SET_LOAD_WARD, false)
    if (success) {
      commit(SET_WARDS, response.data)
      if (payload.cb) {
        payload.cb(response.data)
      }
    } else {
      dispatch('snackbar/showSnackBar', {
        color: 'warning',
        text: i18n.tc('errors.internal_server')
      }, { root: true })
    }
  }
}

/**
 * mutations
 */
const mutations = {
  [SET_COUNTRIES]: (state, data) => {
    state.countries = data
  },
  [SET_CITIES]: (state, data) => {
    state.cities = data
  },
  [SET_DISTRICTS]: (state, data) => {
    state.districts = data
  },
  [SET_WARDS]: (state, data) => {
    state.wards = data
  },
  [SET_LOAD_COUNTRY]: (state, loading) => {
    state.loadCountry = loading
  },
  [SET_LOAD_CITY]: (state, loading) => {
    state.loadCity = loading
  },
  [SET_LOAD_DISTRICT]: (state, loading) => {
    state.loadDistrict = loading
  },
  [SET_LOAD_WARD]: (state, loading) => {
    state.loadWard = loading
  },
  [SET_INITIAL_STATE]: (state) => {
    state.countries = initState().countries
    state.cities = initState().cities
    state.districts = initState().districts
    state.wards = initState().wards
    state.loadCountry = initState().loadCountry
    state.loadCity = initState().loadCity
    state.loadDistrict = initState().loadDistrict
    state.loadWard = initState().loadWard
  }
}

/**
 * getters
 */
const getters = {
  countries: (state) => state.countries,
  loadCountry: (state) => state.loadCountry,
  cities: (state) => state.cities,
  loadCity: (state) => state.loadCity,
  districts: (state) => state.districts,
  loadDistrict: (state) => state.loadDistrict,
  wards: (state) => state.wards,
  loadWard: (state) => state.loadWard
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
