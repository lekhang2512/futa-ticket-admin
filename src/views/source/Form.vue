<template>
  <ValidationObserver
    v-slot="{ invalid, passes }"
    ref="observer"
  >
    <v-form @submit.prevent="passes(submit)">
      <v-row dense>
        <v-col cols="12">
          <ValidationProvider
            :name="$t('pages.ticket_type.name')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              ref="name"
              v-model="formData.name"
              :label="$t('pages.ticket_type.name')"
              name="name"
              type="text"
              :messages="errors[0] || ''"
              :error="!!errors.length"
            >
              <template v-slot:label>
                <div>
                  {{$t('pages.ticket_type.name')}} <sup class="red--text">*</sup>
                </div>
              </template>
            </v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12">
          <div class="d-flex justify-end">
            <v-btn
              small
              :disabled="invalid"
              :loading="!!submitting"
              color="primary"
              @click="passes(submit)"
            >
              {{ $t('actions.create') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { pick } from 'lodash'
// import { mapActions, mapGetters } from 'vuex'

const initFrom = {
  name: '',
  description: ''
}
export default {
  name: 'SourceForm',
  props: {
    type: {
      type: String,
      default: 'create',
    },
    submitting: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      formData: Object.assign({}, initFrom),
    }
  },
  computed: {
  },
  methods: {
    submit () {
      console.log('submit form')
      this.$emit('submit', this.formData)
    }
  },
  mounted () {
    this.$refs.name.focus()
  },
  created () {
    this.$on('init', (data) => {
      let allowData = pick(data, 'name')
      this.$refs.observer.reset();
      this.formData = Object.assign({}, initFrom, allowData)
    })
  },
  watch: {

  }
}
</script>
