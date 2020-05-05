<template>
  <ValidationObserver
    v-slot="{ invalid, passes }"
    ref="observer"
  >
    <v-form @submit.prevent="passes(submit)">
      <v-row dense>
        <v-col cols="12">
          <ValidationProvider
            name="Tên"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              ref="name"
              v-model="formData.name"
              label="Tên"
              name="name"
              type="text"
              :messages="errors[0] || ''"
              :error="!!errors.length"
            >
              <template v-slot:label>
                <div>
                  Tên <sup class="red--text">*</sup>
                </div>
              </template>
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12">
          <ValidationProvider
            name="Email"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              ref="email"
              v-model="formData.email"
              label="Email"
              name="email"
              type="email"
              :messages="errors[0] || ''"
              :error="!!errors.length"
            >
              <template v-slot:label>
                <div>
                  Email <sup class="red--text">*</sup>
                </div>
              </template>
            </v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12">
          <ValidationProvider
            name="Số điện thoại"
            rules="numeric"
            v-slot="{ errors }"
          >
            <v-text-field
              ref="phone"
              v-model="formData.phone"
              label="Số điện thoại"
              name="phone"
              type="number"
              :messages="errors[0] || ''"
              :error="!!errors.length"
            >
              <template v-slot:label>
                <div>
                  Số điện thoại
                </div>
              </template>
            </v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12">
          <ValidationProvider
            name="Địa chỉ"
            v-slot="{ errors }"
          >
            <v-text-field
              ref="address"
              v-model="formData.address"
              label="Địa chỉ"
              name="address"
              type="text"
              :messages="errors[0] || ''"
              :error="!!errors.length"
            >
              <template v-slot:label>
                <div>
                  Địa chỉ
                </div>
              </template>
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="formData.roles"
            :items="all_roles"
            item-value="id"
            item-text="name"
            label="Vai trò"
            multiple
          >
          </v-select>
        </v-col>

        <!-- <v-col cols="12">
          <v-checkbox v-model="formData.active" label="Active"></v-checkbox>
        </v-col> -->

        <v-col cols="12">
          <div class="d-flex justify-end">
            <v-btn
              :disabled="invalid"
              :loading="!!submitting"
              color="primary"
              @click="passes(submit)"
            >
              {{ type === 'create' ? $t('actions.create') : $t('actions.update')}}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { pick } from 'lodash'
import { mapActions, mapGetters } from 'vuex'

const initFrom = {
  name: '',
  email: '',
  phone: '',
  address: '',
  active: true,
  roles: []
}
export default {
  name: 'UserForm',
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
    ...mapGetters('role', ['all_roles'])
  },
  methods: {
    ...mapActions('role', ['getAll']),
    submit () {
      this.$emit('submit', this.formData)
    },
    fetchRoles () {
      if (!this.all_roles.length) {
        this.getAll()
      }
    }
  },
  mounted () {
    this.$refs.name.focus()
    this.fetchRoles()
  },
  created () {
    this.$on('init', (data) => {
      let allowData = pick(data, 'name', 'email', 'phone', 'address', 'active', 'roles')
      this.$refs.observer.reset()
      this.formData = Object.assign({}, initFrom, allowData)
    })
  },
  watch: {

  }
}
</script>
