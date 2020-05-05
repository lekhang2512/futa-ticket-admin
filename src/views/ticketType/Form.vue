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
          <ValidationProvider
            :name="$t('pages.ticket_type.description')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="formData.description"
              :label="$t('pages.ticket_type.description')"
              name="description"
              type="text"
              :messages="errors[0] || ''"
              :error="!!errors.length"
            >
              <template v-slot:label>
                <div>
                  {{$t('pages.ticket_type.description')}} <sup class="red--text">*</sup>
                </div>
              </template>
            </v-text-field>
          </ValidationProvider>
        </v-col>
         <v-col cols="6">
          <ValidationProvider
            :name="$t('pages.ticket_type.type')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-autocomplete
              autocomplete='off'
              :label="$t('pages.ticket_type.type')"
              name="type"
              v-model="formData.type"
              :messages="errors[0] || ''"
              :error="!!errors.length"
              :items="types"
              item-text="name"
              item-value="code"
            >
              <template v-slot:label>
                <div>
                  {{$t('pages.ticket_type.type')}} <sup class="red--text">*</sup>
                </div>
              </template>
            </v-autocomplete>
          </ValidationProvider>
        </v-col>

    <!--     <v-col cols="12" sm="4">
          <ValidationProvider
            :name="$t('pages.ticket.assignee')"
            rules="required"
            v-slot="{ errors }"
            >
            <v-autocomplete
              name="type_id"
              v-model="formData.type_id"
              :items="roles"
              item-text="name"
              item-value="id"
              :label="$t('pages.ticket.assignee')"
              :messages="errors[0] || ''"
              :error="!!errors.length"
              :loading="false"
              :filter="filterType"
              clearable
              clear-icon="close"
              class="input-required"
            >
              <template slot="selection" slot-scope="data">
                {{ data.item.name }}
              </template>
            </v-autocomplete>
          </ValidationProvider>
        </v-col> -->

        <v-col cols="12">
          <div class="d-flex justify-end">
            <v-btn
              small
              :disabled="invalid"
              :loading="!!submitting"
              color="primary"
              @click="passes(submit)"
            >
              {{isCreateForm() ? $t('actions.create') : $t('actions.update')}}
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
  description: '',
  type: null
}
export default {
  name: 'TicketTypeForm',
  props: {
    typeForm: {
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
      types: [
        { name: 'Hệ thống', code: 1 },
        { name: 'Khách hàng', code: 2 }
      ],
    }
  },
  computed: {
    // ...mapGetters('role', ['roles'])
  },
  methods: {
    // ...mapActions('role', ['getByQuery']),
    submit () {
      this.$emit('submit', this.getFormData())
    },
    getFormData () {
      return this.formData
    },
    isCreateForm () {
      return this.getType() === 'create'
    },
    getType () {
      return this.typeForm || 'create'
    }
  },
  mounted () {
    this.$refs.name.focus()
  },
  created () {
    this.$on('init', (data) => {
      let allowData = pick(data, 'name', 'description', 'type')
      this.$refs.observer.reset();
      this.formData = Object.assign({}, initFrom, allowData)
    })
  },
  watch: {

  }
}
</script>
