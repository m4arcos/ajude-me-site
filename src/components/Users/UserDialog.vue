<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        <v-icon small>fas fa-users</v-icon>
        <span class="user-icon-text">Novo Usuário</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">
          <v-icon big color="primary">fas fa-users</v-icon>
          <span v-if="!editing" class="user-icon-text">Cadastrar Usuário</span>
          <span v-else class="user-icon-text">Usuário</span>
        </span>
      </v-card-title>
      <v-card-text>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-alert v-if="success" type="success">{{ successMessage }}</v-alert>
        <v-alert v-if="error" type="error">{{ errorMessage }}</v-alert>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Nome" v-model="user.name" required placeholder="Nome"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Senha" v-model="user.password" type="password" required placeholder="Senha"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="E-mail" v-model="user.mail" placeholder="E-mail para contato"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Telefone" v-model="user.phone"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Celular" v-model="user.cellphone"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="closeDialog()">Fechar</v-btn>
        <v-btn
          color="primary darken-1"
          text
          @click="editing ? editUser(user.id, user) : createUser(user)"
        >Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import config from "../../configs/api";

export default {
  name: "user-dialog",
  props: {
    user: {},
  },
  data() {
    return {
      dialog: false,
      editing: false,
      loading: false,
      error: false,
      errorMessage: "",
      success: false,
      successMessage: "",
      userObj: {
        id: null,
        name: "",
        mail: "",
        phone: "",
        cellphone: "",
      },
    };
  },
  methods: {
    closeDialog() {
      this.success = false;
      this.successMessage = "";
      this.error = false;
      this.errorMessage = "";
      this.dialog = false;
      this.editing = false;
      this.$emit("set:editing-user", this.userObj);
    },
    show() {
      this.dialog = true;
    },
    async createUser(newUser) {
      this.success = false;
      this.successMessage = "";
      this.loading = true;
      let apiAddress = config.address + '/users';

      try {
        const response = await fetch(
          apiAddress,
          {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        const data = await response.json();
        this.loading = false;
        this.success = true;
        this.successMessage = "Criado com sucesso! 😁";
        this.user.id = data.id;
        this.editing = true;
        this.$emit("add:user", data);
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Não foi possível criar 😞";
        this.$emit("set:editing-user", this.userObj);
        console.error(error);
      }
    },
    async editUser(id, user) {
      this.success = false;
      this.successMessage = "";
      this.loading = true;
      let apiAddress = config.address + '/users/' + id;

      try {
        const response = await fetch(
          apiAddress,
          {
            method: "PUT",
            body: JSON.stringify(user),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        const data = await response.json();
        this.$emit("edit:user", id, data);
        this.loading = false;
        this.success = true;
        this.successMessage = "Salvo com sucesso 😁";
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Não foi possível alterar 😟";
        this.$emit("set:editing-user", this.userObj);
        console.error(error);
      }
    },
  },
};
</script>