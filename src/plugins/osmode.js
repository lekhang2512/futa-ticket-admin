import Vue from 'vue'

class OSMode {
  isDarkMode () {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  isLightMode () {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
  }
}

Vue.use({
  install: function (Vue) {
    Vue.prototype.$osmode = new OSMode()
  }
})
