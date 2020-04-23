<template>
  <ValidationObserver v-slot="{ invalid, passes }" ref="observer">
    <v-form @submit.prevent="passes(submit)" @keyup.native.enter="passes(submit)">
      <v-row dense>
        <v-col cols="12" sm="6">
          <ValidationProvider
            :name="$t('pages.card.input_name')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              ref="input_name"
              :label="$t('pages.card.input_name')"
              name="name"
              v-model="formData.name"
              type="text"
              :messages="errors[0] || ''"
              :error="!!errors.length"
              class="input-required"
            />
          </ValidationProvider>
        </v-col>

        <v-col cols="12" sm="6">
          <ValidationProvider
            :name="$t('pages.card.input_number')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              :label="$t('pages.card.input_number')"
              name="number"
              v-model="formData.number"
              :messages="errors[0] || ''"
              :error="!!errors.length"
              class="input-required"
            />
          </ValidationProvider>
        </v-col>

        <v-col cols="12" md="6">
          <ValidationProvider
            :name="$t('pages.card.input_bank_id')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-autocomplete
              name="bank_id"
              v-model="formData.bank_id"
              :items="banks"
              item-text="name"
              item-value="id"
              :label="$t('pages.card.input_bank_id')"
              :messages="errors[0] || ''"
              :error="!!errors.length"
              return-object
              :loading="loadBank"
              :filter="filterBank"
              clearable
              clear-icon="close"
              class="input-required"
            >
              <template slot="selection" slot-scope="data">
                {{ data.item.name }} - {{ data.item.code }}
              </template>

              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content v-if="!$vuetify.breakpoint.xsOnly">
                    <v-list-item-title>{{data.item.name}} - {{data.item.code}}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-content v-else>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.code"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>

            </v-autocomplete>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" md="6">
          <ValidationProvider
            :name="$t('pages.card.input_branch')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              :label="$t('pages.card.input_branch')"
              name="branch"
              v-model="formData.branch"
              :messages="errors[0] || ''"
              :error="!!errors.length"
              class="input-required"
            />
          </ValidationProvider>
        </v-col>

        <v-col cols="12">
          <div class="d-flex justify-end">
            <button-submit
              small
              :text="$t('pages.common.button_create')"
              :disabled="invalid"
              :dark="!invalid"
              :loading="btnLoading"
              @click="passes(submit)"/>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </ValidationObserver>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { vnFilter } from '@/utils'

const initFrom = {
  name: '',
  number: '',
  branch: '',
  bank_id: ''
}

export default {
  name: 'CardForm',
  props: [
    'type', 'btnLoading'
  ],
  data () {
    return {
      formData: Object.assign({}, initFrom)
    }
  },
  computed: {
    ...mapGetters('bank', ['banks', 'loadBank'])
  },
  methods: {
    ...mapActions('bank', ['getBanks']),
    submit () {
      this.$emit('submit', this.formData)
    },
    fetchBanks () {
      if (!this.banks.length) {
        this.getBanks({
          query: { limit: -1 }
        })
      }
    },
    filterBank (item, queryText) {
      return vnFilter(item.name.toLocaleLowerCase()).indexOf(vnFilter(queryText.toLocaleLowerCase())) > -1 ||
      vnFilter(item.code.toLocaleLowerCase()).indexOf(vnFilter(queryText.toLocaleLowerCase())) > -1
    },
  },
  created () {
    this.$on('init', (data) => {
      let allowData = (({ name, number, branch, branch_id }) => ({ name, number, branch, branch_id }))(data)
      this.$refs.observer.reset();
      this.formData = Object.assign({}, initFrom, allowData)
    })
  },
  mounted () {
    this.fetchBanks()

    this.$refs.input_name.focus()
  },
  watch: {
    'formData.bank_id' (val) {
      if (val && typeof(val) === 'object' ) {
        this.formData.bank_id = val.id
      }
    }
  }

}
</script>
