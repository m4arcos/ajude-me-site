<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-alert v-if="success" type="success">{{ successMessage }}</v-alert>
                <v-alert v-if="error" type="error">{{ errorMessage }}</v-alert>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    label="Nome"
                    v-model="user.name"
                    required
                    :error="(submitting && invalidName)"
                    @focus="clearStatus"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Senha"
                    v-model="user.password"
                    prepend-icon="mdi-lock"
                    type="password"
                    required
                    :error="(submitting && invalidPassword)"
                    @focus="clearStatus"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login(user)">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    user: {
      name: "",
      password: "",
    },
    submitting: false,
    error: false,
    errorMessage: "",
    success: false,
    successMessage: "",
    mockAccount: {
      name: "user",
      password: "pass",
    },
  }),
  methods: {
    login() {
      this.submitting = true;

      if (this.invalidName || this.invalidPassword) {
        this.error = true;
        this.errorMessage = "Usuário ou senha inválidos";

        return;
      }

        this.$emit("authenticated", this.user);
    },

    clearStatus() {
      this.success = false;
      this.successMessage = "";
      this.error = false;
      this.errorMessage = "";
    },
  },
  computed: {
    invalidName() {
      return (this.user.name === "") || (this.mockAccount.name != this.user.name);
    },

    invalidPassword() {
      return (this.user.password === "") || (this.mockAccount.password != this.user.password);
    },
  },
};
</script>