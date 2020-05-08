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
            name="Slug"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              ref="slug"
              v-model="formData.slug"
              label="Slug"
              name="slug"
              type="text"
              :messages="errors[0] || ''"
              :error="!!errors.length"
            >
              <template v-slot:label>
                <div>
                  Slug <sup class="red--text">*</sup>
                </div>
              </template>
            </v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12">
          <v-row dense v-for="(permission, key) in permissions" :key="key">
            <v-col cols="12">
              <header>{{ permission.title }}</header>
            </v-col>
            <v-checkbox 
              v-for="(perm, permKey) in permission.list"
              :key="permKey"
              v-model="selectedPermissions" 
              :value="`${key}.${permKey}`"
              :label="perm"
              class="mx-2"></v-checkbox>
          </v-row>
        </v-col>

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
  slug: '',
  permissions: []
}
export default {
  name: 'RoleForm',
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
      selectedPermissions: []
    }
  },
  computed: {
    ...mapGetters('permission', ['permissions'])
  },
  methods: {
    ...mapActions('permission', ['getByQuery']),
    submit () {
      console.log('submit form')
      let formPermissions = {}
      this.selectedPermissions.forEach((perm) => {
        formPermissions[perm] = true
      })
      this.$emit('submit', Object.assign({}, this.formData, {permissions: formPermissions}))
    },
    fetchPermissions () {
      this.getByQuery({
        query: {},
        cb: () => {}
      })
    }
  },
  mounted () {
    this.$refs.name.focus()
    if (!this.permissions.length) {
      this.fetchPermissions()
    }
  },
  created () {
    this.$on('init', (data) => {
      let allowData = pick(data, 'name', 'slug')
      this.$refs.observer.reset();
      this.formData = Object.assign({}, initFrom, allowData)
      if (data.permissions) {
        Object.keys(data.permissions).forEach(key => {
          if (data.permissions[key] === true) {
            this.selectedPermissions.push(key)
          }
        })
      }
    })
  },
  watch: {

  }
}
</script>
