import Vue from 'vue'
import VueGoogleCharts from 'vue-google-charts'

Vue.mixin({
  methods: {
    generateChartOptions (options) {
      if (this.$osmode.isDarkMode()) {
        let darkOptions = {
          backgroundColor: '#303030',
          legendTextStyle: { color: '#FFF' },
          titleTextStyle: { color: '#FFF' },
          gridlines: {
            color: "#FFF"
          },
          baselineColor: '#FFF',
          hAxis: {
            textStyle:{color: '#FFF'}
          },
          vAxis: {
            textStyle:{color: '#FFF'}
          }
        }
        return Object.assign({}, darkOptions, options)
      }
      return options
    }
  }
})

Vue.use(VueGoogleCharts)
