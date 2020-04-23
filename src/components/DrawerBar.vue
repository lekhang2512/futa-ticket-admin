<template>
  <v-list dense nav>
    <info-app-bar class="d-block d-md-none" />
    <v-divider class="d-block d-md-none mt-3"></v-divider>
    <v-subheader class="font-weight-bold">
      <span class="w100">Menu</span>
    </v-subheader>
    <template v-for="(item, key) in getMainMenu()">
      <v-list-group
        v-if="item.children"
        v-model="item.model"
        :key="item.text"
        :prepend-icon="item.icon"
        append-icon="keyboard_arrow_down"
        :value="checkOpenGroup(item.children, key)"
        >

        <v-list-item slot="activator">
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <template v-for="(child, key) in getSubMenu(item.children)">
          <v-list-item
            :key="key"
            link
            @click="redirectRoute(child.route)"
            active-class="#E7DBFF"
            >
            <v-list-item-action>
              <v-icon size="20">{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-group>

      <v-list-item
        v-else-if="!item.group"
        :key="key"
        link
        @click="redirectRoute(item.route)"
        active-class="#E7DBFF"
      >
        <v-list-item-action>
          <v-icon size="20">{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-subheader :key="key" v-else>{{item.children}}</v-subheader>
    </template>
  </v-list>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import InfoAppBar from './appbar/InfoAppBar.vue'
export default {
  name: 'DrawerBar',
  components: {
    InfoAppBar
  },
  data () {
    return {
      mainMenu: [
        {
          icon: 'dashboard',
          text: this.$t('title.dashboard'),
          route: { name: 'dashboard' },
          can_access: true
        },
        {
          icon: 'mdil-settings',
          text: this.$t('title.setting'),
          can_access: true,
          children: [
            {
              icon: 'sd_card',
              text: this.$t('title.card'),
              route: { name: 'card' },
              can_access: true
            },
            {
              icon: 'mdil-account mdil-24px',
              text: this.$t('title.profile'),
              route: { name: 'profile' },
              can_access: true
            }
          ]
        }
        // {
        //   icon: 'mdil-logout mdil-24px',
        //   text: this.$t('title.logout'),
        //   route: { name: 'logout' },
        //   can_access: true
        // },
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    redirectRoute (route) {
      if (route.name == 'logout') {
        this.logout()
      } else {
        this.$router.push(route).catch(err => { err })
      }
    },
    getMainMenu () {
      return this.mainMenu.filter(value => value.can_access)
    },
    getSubMenu (children) {
      return children.filter(value => value.can_access)
    },
    checkOpenGroup (routers, key) {
      if (routers.length) {
        routers.forEach(router => {
          if (router.route.name === this.$route.name) {
            this.mainMenu[key].model = true
          }
        })
      }
    },
  }
}
</script>
