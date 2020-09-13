<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="isAuthenticated"
      v-model="drawer"
      :mini-variant.sync="mini"
      :expand-on-hover="true"
      app
      class="grey lighten-5"
    >
      <template v-slot:prepend>
        <v-list-item two-line class="px-2">
          <v-list-item-avatar>
            <img :src="getGravarUrl(user.mail)" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.mail }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
      <navigation-menu />
      <template v-slot:append>
        <v-list-item @click="logout()">
          <v-list-item-action>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-app-bar v-if="isAuthenticated" app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{pageTitle}}</v-toolbar-title>
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
import md5 from "md5";

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
    mini: true,
    user: {
      name: "",
      mail: "",
    },
    pageTitle: "Ajude.me",
  }),
  mounted() {
    if (!this.isAuthenticated) {
      this.$router.replace({ name: "login" });
    }

    this.user = this.getSessionUser();
  },
  methods: {
    updatePageTitle(title) {
      this.pageTitle = title;
    },

    setAuthenticated(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authenticated", true);
      this.authenticated = true;
      this.isAuthenticated;
      this.$router.replace({ name: "home" });
    },

    getGravarUrl(mail) {
      return "https://www.gravatar.com/avatar/" + md5(mail);
    },

    getSessionUser() {
      const user = localStorage.user;

      return user ? JSON.parse(user) : false;
    },

    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("authenticated");

      this.user = {};
      this.authenticated = false;
      this.$router.replace({ name: "login" });
    },
  },
  computed: {
    isAuthenticated() {
      // const user = this.getSessionUser;
      const authenticated = localStorage.authenticated;
      return (this.user && authenticated) || this.authenticated;
    },
  },
};
</script>