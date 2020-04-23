<template>
  <v-text-field
    outlined
    dense
    :label = "label"
    v-model = "moneyCustom"
    :append-icon = "icon"
    @input = "commit"
    @blur = 'isInputActive = false'
    @focus = 'isInputActive = true'
  ></v-text-field>
</template>

<script>
  import {debounce} from 'lodash'

  export default {
    name: 'FilterMoneyField',
    props: {
      label: String,
      icon: {
        type: String,
        default: 'mdi-numeric',
      },
    },
    computed: {
      moneyCustom: {
        get() {
          // check nếu focus thì trả về string
          if (this.isInputActive && this.money) {
            return this.money.toString()
          } else if (this.money) {
            // không focus thì format sang kiểu money
            return parseFloat(this.money).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          }
          return undefined
        },
        set(param) {
          if (param) {
            let money  = parseFloat(param.replace(/[^\d.]/g, ''))
            this.money = isNaN(money) ? 0 : money
          } else {
            this.money = undefined
          }
        },
      },
    },
    data() {
      return {
        isInputActive: false,
        money: undefined,
      }
    },
    methods: {
      commit: debounce(function () {
        this.$emit('input', this.money)
      }, 800),
    },
  }
</script>

<style scoped>

</style>
