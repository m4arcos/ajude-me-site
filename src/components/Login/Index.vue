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
                <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
                <v-alert v-if="success" type="success">{{ successMessage }}</v-alert>
                <v-alert v-if="error" type="error">{{ errorMessage }}</v-alert>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    label="E-mail"
                    v-model="user.mail"
                    required
                    :error="(submitting && invalidMail)"
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
import config from "../../configs/api";

export default {
  name: "Login",
  data: () => ({
    user: {
      mail: "",
      password: "",
    },
    loading: false,
    submitting: false,
    error: false,
    errorMessage: "",
    success: false,
    successMessage: "",
    mockAccount: {
      mail: "m4arcos@gmail.com",
      password: "pass",
    },
  }),
  methods: {
    login() {
      this.submitting = true;

      if (this.invalidMail || this.invalidPassword) {
        this.error = true;
        this.errorMessage = "Usuário ou senha inválidos";

        return;
      }

      this.auth();
    },

    async auth() {
      this.loading = true;

      let apiAddress = config.address + '/auth';

      try {
        const response = await fetch(
          apiAddress,
          {
            method: "POST",
            body: JSON.stringify(this.user),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        const data = await response.json();
        this.loading = false;
        this.success = true;
        this.successMessage = "Autenticado com sucesso! 😁";
        this.user = data;
        this.$emit("authenticated", this.user);
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Não foi possível autenticar 😞";
        console.error(error);
      }
    },

    clearStatus() {
      this.success = false;
      this.successMessage = "";
      this.error = false;
      this.errorMessage = "";
    },
  },
  computed: {
    invalidMail() {
      return (this.user.mail === "") || (this.mockAccount.mail != this.user.mail);
    },

    invalidPassword() {
      return (this.user.password === "") || (this.mockAccount.password != this.user.password);
    },
  },
};
</script>