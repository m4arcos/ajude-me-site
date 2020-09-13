<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        <v-icon small>fas fa-hands</v-icon>
        <span class="need-icon-text">Pedir ajuda</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">
          <v-icon big color="primary">fas fa-hands</v-icon>
          <span v-if="!editing" class="need-icon-text">Pedir ajuda</span>
          <span v-else class="need-icon-text">Ajuda</span>
        </span>
      </v-card-title>
      <v-card-text>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-alert v-if="success" type="success">{{ successMessage }}</v-alert>
        <v-alert v-if="error" type="error">{{ errorMessage }}</v-alert>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Título"
              v-model="need.title"
              required
              placeholder="Título do que preciso"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Resumo" v-model="need.summary" required placeholder="Resumo"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="Descrição e informações para contato"
              v-model="need.text"
              required
              placeholder="Descrição e informações para contato"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="closeDialog()">Fechar</v-btn>
        <v-btn
          color="primary darken-1"
          text
          @click="editing ? editNeed(need.id, need) : createNeed(need)"
        >Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import config from "../../configs/api";

export default {
  name: "need-dialog",
  props: {
    need: {},
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
      needObj: {
        id: null,
        title: "",
        summary: "",
        text: "",
        user_id: "",
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
      this.$emit("set:editing-need", this.needObj);
    },
    show() {
      this.dialog = true;
    },
    async createNeed(newNeed) {
      this.success = false;
      this.successMessage = "";
      this.loading = true;
      let apiAddress = config.address + '/needs';

      newNeed.user_id = 1;

      try {
        const response = await fetch(
          apiAddress,
          {
            method: "POST",
            body: JSON.stringify(newNeed),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        const data = await response.json();
        this.loading = false;
        this.success = true;
        this.successMessage = "Criado com sucesso, obrigado pela sua ajuda! 😁";
        this.need.id = data.id;
        this.editing = true;
        this.$emit("add:need", data);
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Não foi possível criar 😞";
        this.$emit("set:editing-need", this.needObj);
        console.error(error);
      }
    },
    async editNeed(id, need) {
      this.success = false;
      this.successMessage = "";
      this.loading = true;

      need.user_id = 1;

      try {

      let apiAddress = config.address + '/needs/' + id;
        const response = await fetch(
          apiAddress,
          {
            method: "PUT",
            body: JSON.stringify(need),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        const data = await response.json();
        this.$emit("edit:need", id, data);
        this.loading = false;
        this.success = true;
        this.successMessage = "Salvo com sucesso 😁";
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Não foi possível alterar 😟";
        this.$emit("set:editing-need", this.needObj);
        console.error(error);
      }
    },
  },
};
</script>