<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="isAuthenticated" v-model="drawer" app class="grey lighten-5">
      <navigation-menu />
    </v-navigation-drawer>

    <v-app-bar v-if="isAuthenticated" app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{pageTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="user-name" style="margin-right: 15px">Fulano de Tal</span>
      <v-avatar color="secondary">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>
    </v-app-bar>

    <v-main v-if="isAuthenticated" class="bodyBgColor">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <router-view @update:pageTitle="updatePageTitle" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-main v-else>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <router-view @authenticated="setAuthenticated" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer v-if="isAuthenticated" color="secondary" app>
      <span class="white--text">&copy; Marcos Medeiros Rodrigues - {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavigationMenu from "./components/NavigationMenu.vue";
export default {
  name: "App",
  components: {
    NavigationMenu,
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: true,
    authenticated: false,
    pageTitle: "Ajude.me",
  }),
  mounted() {
    if (!this.isAuthenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    updatePageTitle(title) {
      this.pageTitle = title;
    },

    setAuthenticated(user) {
      this.authenticated = true;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authenticated", true);
      this.isAuthenticated;
      this.$router.replace({ name: "home" });
    },
  },
  computed: {
    isAuthenticated() {
      const user = localStorage.user;
      const authenticated = localStorage.authenticated;
      return (user && authenticated) || this.authenticated;
    },
  },
};
</script>