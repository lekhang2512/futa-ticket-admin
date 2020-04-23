import Vue from 'vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify/lib'
import Fragment from 'vue-fragment'
import '@mdi/light-font/css/materialdesignicons-light.css'

let options = {
  icons: {
    iconfont: 'md',
  },
  theme: {
    // dark: true,
    themes: {
      light: {
        primary: '#330392',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        indigo: {
          darken4: '#330392'
        },
        grey: '#666666'
      },
    },
  },
}

Vue.use(Vuetify, options)
Vue.use(Fragment.Plugin)

export default new Vuetify(options)
