<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent
    >
    <v-card>
      <v-card-title
        class="pa-0 title justify-center font-weight-bold dialog-title"
        primary-title
        >
        {{$t('pages.app.pay_in')}}
        <v-btn text icon @click="dialog = false" class="dialog-close">
          <v-icon size="16">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="body-2 dialog-content">
        <Form
          ref="form"
          type="create"
          @submit="submit"
          :submitting="submitting"
          />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Form from '@/views/transaction/Form.vue'

export default {
  name: 'DialogPayIn',
  components: {
    Form
  },
  data () {
    return {
      dialog: false,
      submitting: false
    }
  },
  props: ['value'],
  computed: {
    ...mapGetters('auth', ['user'])
  },
  mounted () {
    this.dialog = this.value
  },
  methods: {
    ...mapActions('wallet', ['getIncomeOfWallet']),
    async submit (data) {
      this.submitting = true
      await this.getIncomeOfWallet({
        code: this.user.debit.code,
        data: data,
        cb: () => {
          this.$refs.form.$emit('init', {})
          this.submitting = false
          this.dialog = false
          this.$router.push({'name': 'transaction', query: this.parseListParrams() })
        }
      })
    },
    parseListParrams () {
      try {
        let params = JSON.parse(this.$route.query.list)
        params.rf = 1
        return params
      } catch(e) {
        return {rf: 1}
      }
    }
  },
  watch: {
    value: function () {
      this.dialog = this.value
    },
    dialog: function () {
      this.$emit('input', this.dialog)
    }
  }
}
</script>

<style lang="css" scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
  .dialog-title {
    font-size: 18px !important;
    height: 54px;
  }
  .dialog-close {
    position: absolute;
    right: 5px;
  }
  .dialog-content {
    padding: 15px !important;
  }
  .dialog-syntax {
    width: 380px;
    height: 35px;
    background: #E7DBFF;
    border-radius: 100px;
    margin: auto;
  }
</style>
