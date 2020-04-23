<template>
  <v-menu
    offset-y
    max-width="300"
    max-height="400"
    nudge-width="268"
    nudge-bottom="11"
    :close-on-content-click="true"
    >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon :class="!$vuetify.breakpoint.xsOnly && 'mr-1'">
        <v-avatar title size="32">
          <img
            :src="user.avatar_path"
            :alt="user.name"
            >
        </v-avatar>
      </v-btn>
    </template>

    <v-card class="account-card d-flex flex-column align-center justify-center">
      <div v-if="!avatar" class="d-flex flex-column align-center justify-center">
        <div class="account-avatar mb-5">
          <v-avatar title size="80">
            <img
              :src="user.avatar_path"
              :alt="user.name"
            >
          </v-avatar>
          <v-btn fab small absolute class="account-avatar-camera" width="32" height="32" elevation="3" @click="$refs.file.click()">
            <v-icon>mdi-camera-outline</v-icon>
          </v-btn>
          <input class="d-none" type="file" ref="file" @change="uploadImage($event)" accept="image/*" />
        </div>
        <v-card-title class="pa-0 account-name font-weight-bold">{{user.name}}</v-card-title>
        <v-card-text class="account-email pa-0 text-center mb-4">
          {{user.email}}
        </v-card-text>

        <v-btn rounded outlined height="36" block class="account-setting-button mb-5" @click="redirectProfile()">{{$t('pages.app.account_setting')}}</v-btn>
        <!-- <v-card-title class="pa-0 account-rank font-weight-bold mb-3">
          {{$t('pages.app.user_rank')}}
          <v-btn text icon @click="showDialogUserRank()">
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-flex class="mb-5" v-if="user.level">
          <img
            v-for="n in user.level"
            :key="n"
            :src="user.level_icon"
            class="account-rank-icon"
          >
        </v-flex>
        <p class="mb-5" v-else>{{$t('pages.app.no_rank')}}</p> -->
        <v-btn @click.prevent.stop="logout" outlined class="account-logout-button" height="36" width="160">{{$t('pages.app.logout')}}</v-btn>
      </div>
    </v-card>

    <dialog-user-rank v-model="dialogUserRank" />
  </v-menu>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import DialogUserRank from '../dialog/DialogUserRank'

  export default {
    name: 'AccountAppBar',
    data: () => ({
      dialogUserRank: false,
      avatar: null
    }),
    computed: {
      ...mapGetters('auth', ['user'])
    },
    components: {
      DialogUserRank
    },
    methods: {
      ...mapActions('auth', ['logout', 'changeAvatar', 'profile']),
      showDialogUserRank () {
        this.dialogUserRank = true
      },
      redirectProfile () {
        this.$router.push({ name: 'profile', hash: '#edit-profile' })
      },
      uploadImage (event) {
        var input = event.target
        if (input.files && input.files[0]) {
          var reader = new FileReader()
          reader.onload = (e) => {
            this.avatar = e.target.result
          }
          reader.readAsDataURL(input.files[0])
        }

        let formData = new FormData()
        formData.append('file', input.files[0])
        formData.append('name', 'Avatar')
        formData.append('width', 200)
        formData.append('height', 200)
        this.changeAvatar({
            data: formData,
            cb: () => {
              this.profile({})
              this.avatar = null
            }
          })
      }
    }
  }
</script>
<style lang="css" scoped>
  .account-card {
    padding: 20px 30px;
  }
  .account-avatar {
    position: relative;
  }
  .account-avatar-camera {
    bottom: 0;
    right: -5px;
  }
  .account-name {
    font-size: 18px;
    color: red;
  }
  .account-email {
    font-weight: 500;
  }
  .account-setting-button {
    border: 1px solid #CCCCCC;
    border-radius: 100px;
    font-weight: 500;
    font-size: 14px;
    text-transform: none;
    letter-spacing: normal;
  }
  .account-rank {
    font-size: 18px;
  }
  .account-rank-icon {
    margin: 0 5px;
  }
  .account-logout-button {
    border: 1px solid #DEDEDE;
    border-radius: 4px;
    text-transform: none;
    letter-spacing: normal;
  }
  .upload-cropper {
    border: solid 1px #EEE;
    height: 300px;
    width: 100%;
  }
</style>
