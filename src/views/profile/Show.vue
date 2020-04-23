<template>
  <v-container fluid class="pa-6">
    <v-row dense>
      <v-col cols="12">
        <p class="title mb-4 d-flex align-center flex-wrap">
          {{$t('title.profile')}}
          <v-spacer></v-spacer>

          <v-btn small text color="error" :disabled="change_password" @click="showChangePassword()">
            {{$t('pages.profile.button_change_password')}}
          </v-btn>

          <v-divider vertical></v-divider>
          <edit-button :text="$t('title.edit_profile')" @click="showChangeProfile()" :disabled="edit"/>
        </p>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" sm="5" md="4">
        <v-card :class="$vuetify.breakpoint.smAndUp && 'mr-4'">
          <div class="text-center" style="cursor: grabbing">
            <div v-if="avatar" class="d-flex flex-column align-center justify-center w100">
              <Cropper classname="upload-cropper w100" :src="avatar" ref="cropper" />
              <div class="mt-3">
                <v-btn text small color="red" @click="avatar = null">
                  {{$t('actions.close')}}
                </v-btn>
                <v-btn text small color="primary" @click="uploadAvatar()">
                  {{$t('actions.apply')}}
                </v-btn>
              </div>
            </div>

            <v-tooltip v-else top>
              <template v-slot:activator="{ on }">
                <v-list-item-avatar v-on="on" size="80" @click="$refs.file.click()">
                  <img
                    style="width: 80px !important; border-radius: 50%"
                    :src="user.avatar_path"
                    :alt="user.name"
                    />
                </v-list-item-avatar>
                <input class="d-none" type="file" ref="file" @change="uploadImage($event)" accept="image/*" />
              </template>
              <span>{{$t('pages.profile.change_avatar')}}</span>
            </v-tooltip>
          </div>

          <v-card-title class="pt-0 pb-0">
            <span class="w100 text-center">{{ user.name }}</span>
          </v-card-title>
          <v-card-text>
            <div class="my-4 subtitle-1">
              <v-icon>mdi-email</v-icon>
              {{ user.email }}
              <v-icon v-if="user.email_verified_at" color="green">check</v-icon>
            </div>
            <div class="my-4 subtitle-1">
              <v-icon>mdi-cellphone-basic</v-icon>{{ user.phone }}
            </div>

            <div>
              <v-icon>mdi-map-marker-radius</v-icon> {{user.full_street}}
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="7" md="8">
        <edit-profile v-if="edit" />
        <change-password v-if="change_password" @close="hideChangePassword()" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ChangePassword from './ChangePassword.vue'
import EditProfile from './Edit.vue'
import TokenRepository from '@/repositories/token'
import { Cropper } from 'vue-advanced-cropper'

export default {
  name: 'Profile',
  data () {
    return {
      change_password: false,
      edit: true,
      avatar: null
    }
  },
  methods: {
    ...mapActions('auth', ['profile', 'changeAvatar']),
    ...mapActions('snackbar', ['showSnackBar']),
    showChangePassword () {
      this.edit = false
      this.change_password = true
      this.$router.push({ name: 'profile', hash: '#change-password' }).catch(err => { err })
    },
    showChangeProfile () {
      this.edit = true
      this.change_password = false
      this.$router.push({ name: 'profile', hash: '#edit-profile' }).catch(err => { err })
    },
    hideChangePassword () {
      this.change_password = false
      this.edit = true
    },
    imageuploaded (res) {
      if (res.data && res.data.code) {
        this.profile({})
      } else {
        this.showSnackBar({
          color: 'warning',
          text: res.data.data
        })
      }

    },
    uploadAvatarUrl () {
      return process.env.VUE_APP_API_URL + '/me/avatar'
    },
    uploadAvatarHeaders () {
      return {
        'Authorization': TokenRepository.getTokenFromStorate()
      }
    },
    uploadImage(event) {
      var input = event.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.avatar = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    uploadAvatar () {
      const {canvas} = this.$refs.cropper.getResult()
      canvas.toBlob((blob) => {
        const formData = new FormData()
        formData.append('file', blob, 'avatar.png')
        this.changeAvatar({
          data: formData,
          cb: () => {
            this.profile({})
            this.avatar = null
          }
        })
      })
    }
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  components: {
    ChangePassword,
    EditProfile,
    Cropper
  },
  mounted () {
    if (this.$route.hash === '#edit-profile') {
      this.showChangeProfile()
    }

    if (this.$route.hash === '#change-password') {
      this.showChangePassword()
    }
  }
}
</script>
<style lang="css" scoped>
  .upload-cropper {
    border: solid 1px #EEE;
    height: 300px;
  }
</style>
