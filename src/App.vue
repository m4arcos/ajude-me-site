<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app class="grey lighten-5">
      <navigation-menu />
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        {{pageTitle}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="user-name" style="margin-right: 15px">Fulano de Tal</span>
      <v-avatar color="secondary">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>
    </v-app-bar>

    <v-main class="bodyBgColor">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <router-view @update:pageTitle="updatePageTitle" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="secondary" app>
      <span class="white--text">&copy; Marcos Medeiros Rodrigues - {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavigationMenu from "./components/NavigationMenu.vue";
export default {
  name: "App",
  components: {
    NavigationMenu
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: true,
    pageTitle: "Ajude.me",
  }),
  methods: {
    updatePageTitle(title) {
      this.pageTitle = title;
    },
  },
};
</script>