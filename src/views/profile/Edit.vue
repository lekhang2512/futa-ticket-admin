<template>
  <ValidationObserver v-slot="{ invalid, passes }">
    <v-card>
      <v-toolbar dense>
        <v-toolbar-title>{{$t('title.edit_profile')}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <close-button @click="$emit('close')" /> -->
        <edit-button @click="disabledForm = false" :disabled="!disabledForm" />
      </v-toolbar>

      <v-card-text>
        <v-form @submit.prevent="passes(submit)" @keyup.native.enter="passes(submit)">
          <v-row dense>
            <v-col cols="12" md="6">
              <ValidationProvider
                :name="$t('pages.profile.input_name')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  ref="input_name"
                  :disabled="disabledForm"
                  :label="$t('pages.profile.input_name')"
                  name="name"
                  type="text"
                  v-model="formProfile.name"
                  :messages="errors[0] || ''"
                  :error="!!errors.length"
                  class="input-required"
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="6">
              <ValidationProvider
                :name="$t('pages.profile.input_phone')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  :disabled="disabledForm"
                  :label="$t('pages.profile.input_phone')"
                  name="phone"
                  type="phone"
                  v-model="formProfile.phone"
                  counter
                  :messages="errors[0] || ''"
                  :error="!!errors.length"
                  class="input-required"
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider
                :name="$t('pages.profile.input_street')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  :disabled="disabledForm"
                  :label="$t('pages.profile.input_street')"
                  name="street"
                  type="text"
                  v-model="formProfile.street"
                  :messages="errors[0] || ''"
                  :error="!!errors.length"
                  class="input-required"
                  />
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="4">
              {{ formProfile.city_code }}
              <ValidationProvider
                :name="$t('pages.profile.input_city_code')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-autocomplete
                  :disabled="disabledForm"
                  name="city_code"
                  :loading="loadCity"
                  v-model="formProfile.city_code"
                  :items="cities"
                  item-text="name"
                  item-value="code"
                  :label="$t('pages.profile.input_city_code')"
                  :messages="errors[0] || ''"
                  :error="!!errors.length"
                  return-object
                  :filter="filterCity"
                  clearable
                  clear-icon="close"
                  class="input-required"
                >
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="4">
              <ValidationProvider
                :name="$t('pages.profile.input_district_code')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-autocomplete
                  :disabled="!districtsOfCity.length || disabledForm"
                  v-model="formProfile.district_code"
                  :loading="loadDistrict"
                  name="district_code"
                  :items="districtsOfCity"
                  item-text="name"
                  item-value="code"
                  :label="$t('pages.profile.input_district_code')"
                  :messages="errors[0] || ''"
                  :error="!!errors.length"
                  return-object
                  :filter="filterDistrict"
                  clearable
                  clear-icon="close"
                  class="input-required"
                >
                </v-autocomplete>
              </ValidationProvider>

            </v-col>
            <v-col cols="12" md="4">
              <ValidationProvider
                :name="$t('pages.profile.input_ward_code')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-autocomplete
                  :disabled="!wardsOfDistrict.length || disabledForm"
                  :loading="loadWard"
                  v-model="formProfile.ward_code"
                  name="ward_code"
                  :items="wardsOfDistrict"
                  item-text="name"
                  item-value="code"
                  :label="$t('pages.profile.input_ward_code')"
                  :messages="errors[0] || ''"
                  :error="!!errors.length"
                  return-object
                  :filter="filterWard"
                  clearable
                  clear-icon="close"
                  class="input-required"
                >
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <button-submit
          :text="$t('pages.profile.button_update_profile')"
          :disabled="invalid || disabledForm"
          :small="true"
          :dark="!invalid"
          @click="passes(submit)"/>
      </v-card-actions>
    </v-card>
  </ValidationObserver>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { cloneDeep } from 'lodash'
import { vnFilter } from '@/utils'

export default {
  name: 'EditProfile',
  data () {
    return {
      formProfile: {
        name: '',
        phone: '',
        street: '',
        city_code: '',
        city_name: '',
        district_code: '',
        district_name: '',
        ward_code: '',
        ward_name: ''
      },
      disabledForm: true
    }
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('location', ['cities', 'districts', 'wards', 'loadCity', 'loadDistrict', 'loadWard']),
    districtsOfCity () {
      if (!this.formProfile.city_code) {
        return []
      } else {
        return this.districts
      }
    },
    wardsOfDistrict () {
      if (!this.formProfile.district_code) {
        return []
      } else {
        return this.wards
      }
    },
  },
  methods: {
    ...mapActions('auth', ['changeProfile']),
    ...mapActions('location', ['getCities', 'getDistricts', 'getWards']),
    submit () {
      this.changeProfile({ data: this.formProfile, cb: this.success })
      this.disabledForm = true
    },
    success () {
      this.$router.push({ name: 'profile' }).catch(err => { err })
    },
    fetchCities () {
      // MUTIPLE COUNTRY REMOVE THIS
      if (!this.cities.length) {
        // MUTIPLE COUNTRY OPEN THIS
        // this.getCities({query: {country_code: this.user.country_code || 'VN'}})
        // MUTIPLE COUNTRY REMOVE THIS
        this.getCities({query: {country_code: 'VN'}})
      }
    },
    changeCity () {
      if (this.formProfile.city_code) {
        this.getDistricts({query: {city_code: this.formProfile.city_code}})
      }
    },
    changeDistrict () {
      if (this.formProfile.district_code) {
        this.getWards({query: {district_code: this.formProfile.district_code}})
      }
    },
    filterCity (item, queryText) {
      return vnFilter(item.name.toLocaleLowerCase()).indexOf(vnFilter(queryText.toLocaleLowerCase())) > -1
    },
    filterDistrict (item, queryText) {
      return vnFilter(item.name.toLocaleLowerCase()).indexOf(vnFilter(queryText.toLocaleLowerCase())) > -1
    },
    filterWard (item, queryText) {
      return vnFilter(item.name.toLocaleLowerCase()).indexOf(vnFilter(queryText.toLocaleLowerCase())) > -1
    }
  },
  mounted () {
    this.fetchCities()
    let profile = cloneDeep(this.user)
    this.formProfile = {
      name: profile.name,
      phone: profile.phone,
      street: profile.street,
      city_code: profile.city_code,
      city_name: profile.city_name,
      district_code: profile.district_code,
      district_name: profile.district_name,
      ward_code: profile.ward_code,
      ward_name: profile.ward_name
    }
    this.$nextTick(() => {
      // this.$refs.input_name.focus()
    })
  },
  watch: {
    'formProfile.city_code' (val) {
      if (val && typeof(val) === 'object' ) {
        this.formProfile.city_code = val.code
        this.formProfile.city_name = val.name
        this.formProfile.ward_code = ''
        this.formProfile.ward_name = ''
      }
      this.changeCity()
    },
    'formProfile.district_code' (val) {
      if (val && typeof(val) === 'object' ) {
        this.formProfile.district_code = val.code
        this.formProfile.district_name = val.name
      }
      this.changeDistrict()
    },
    'formProfile.ward_code' (val) {
      if (val && typeof(val) === 'object' ) {
        this.formProfile.ward_code = val.code
        this.formProfile.ward_name = val.name
      }
      this.changeDistrict()
    }
  }
}
</script>
