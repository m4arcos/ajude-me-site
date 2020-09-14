<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        <v-icon small>mdi-account-group</v-icon>
        <span class="ong-icon-text">Nova ONG</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">
          <v-icon big color="primary">mdi-account-group</v-icon>
          <span v-if="!editing" class="ong-icon-text">Cadastrar ONG</span>
          <span v-else class="ong-icon-text">ONG</span>
        </span>
      </v-card-title>
      <v-card-text>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-alert v-if="success" type="success">{{ successMessage }}</v-alert>
        <v-alert v-if="error" type="error">{{ errorMessage }}</v-alert>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Nome" v-model="ong.name" required placeholder="Nome da ONG"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Responsável"
              v-model="ong.owner"
              required
              placeholder="Nome do Responsável"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="E-mail" v-model="ong.mail" placeholder="E-mail para contato"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Telefone" v-model="ong.phone"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Celular" v-model="ong.cellphone"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="closeDialog()">Fechar</v-btn>
        <v-btn
          color="primary darken-1"
          text
          @click="editing ? editOng(ong.id, ong) : createOng(ong)"
        >Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import config from "../../configs/api";

export default {
  name: "ong-dialog",
  props: {
    ong: {},
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
      ongObj: {
        id: null,
        name: "",
        owner: "",
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
      this.$emit("set:editing-ong", this.ongObj);
    },
    show() {
      this.dialog = true;
    },
    async createOng(newOng) {
      this.success = false;
      this.successMessage = "";
      this.loading = true;
      let apiAddress = config.address + '/ongs';

      try {
        const response = await fetch(
          apiAddress,
          {
            method: "POST",
            body: JSON.stringify(newOng),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        const data = await response.json();
        this.loading = false;
        this.success = true;
        this.successMessage = "Criado com sucesso! 😁";
        this.ong.id = data.id;
        this.editing = true;
        this.$emit("add:ong", data);
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Não foi possível criar 😞";
        this.$emit("set:editing-ong", this.ongObj);
        console.error(error);
      }
    },
    async editOng(id, ong) {
      this.success = false;
      this.successMessage = "";
      this.loading = true;

      let apiAddress = config.address + '/ongs/' + id;
      try {
        const response = await fetch(
          apiAddress,
          {
            method: "PUT",
            body: JSON.stringify(ong),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        const data = await response.json();
        this.$emit("edit:ong", id, data);
        this.loading = false;
        this.success = true;
        this.successMessage = "Salvo com sucesso 😁";
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Não foi possível alterar 😟";
        this.$emit("set:editing-ong", this.ongObj);
        console.error(error);
      }
    },
  },
};
</script>