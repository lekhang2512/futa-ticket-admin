import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import { forEach } from 'lodash'
import { SET_INITIAL_STATE } from './mutation-types'

function loadModules () {
  let packs = require.context('./modules', true, /[A-Za-z0-9-_,\s]+\.js$/i)
  let modules = {}
  packs.keys().forEach(key => {
    let matched = key.match(/([A-Za-z0-9-_]+)\./i)
      if (matched && matched.length > 1) {
        let module = matched[1]
        modules[module] = packs(key).default
      }

  })
  return modules
}

const modules = loadModules()

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  // strict: debug,
  state: {},
  actions: {
    resetState ({ commit }) {
      forEach(modules, (module, name) => {
        if (module.mutations[SET_INITIAL_STATE]) {
          if (module.namespaced) {
            commit(name + '/' + SET_INITIAL_STATE)
          } else {
            commit(SET_INITIAL_STATE)
          }
        }
      })
    }
  },
  modules: {
    ...modules
  },
  plugins: debug ? [createLogger()] : []
})
