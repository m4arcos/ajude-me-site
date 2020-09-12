<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        <v-icon small>mdi-heart</v-icon>
        <span class="donation-icon-text">Nova Doação</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">
          <v-icon big color="primary">mdi-heart</v-icon>
          <span v-if="!editing" class="donation-icon-text">Cadastrar Doação</span>
          <span v-else class="donation-icon-text">Doação</span>
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
              v-model="donation.title"
              required
              placeholder="Nome do que posso doar"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Resumo" v-model="donation.summary" required placeholder="Resumo"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="Descrição e informações para contato"
              v-model="donation.text"
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
          @click="editing ? editDonation(donation.id, donation) : createDonation(donation)"
        >Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "donation-dialog",
  props: {
    donation: {},
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
      donationObj: {
        id: null,
        title: "",
        summary: "",
        text: "",
        userId: "",
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
      this.$emit("set:editing-donation", this.donationObj);
    },
    show() {
      this.dialog = true;
    },
    async createDonation(newDonation) {
      this.success = false;
      this.successMessage = "";
      this.loading = true;
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "POST",
            body: JSON.stringify(newDonation),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        const data = await response.json();
        this.loading = false;
        this.success = true;
        this.successMessage = "Criado com sucesso, obrigado pela sua ajuda! 😁";
        this.donation.id = data.id;
        this.editing = true;
        this.$emit("add:donation", data);
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Não foi possível criar 😞";
        this.$emit("set:editing-donation", this.donationObj);
        console.error(error);
      }
    },
    async editDonation(id, donation) {
      this.success = false;
      this.successMessage = "";
      this.loading = true;
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(donation),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        const data = await response.json();
        this.$emit("edit:donation", id, data);
        this.loading = false;
        this.success = true;
        this.successMessage = "Salvo com sucesso 😁";
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Não foi possível alterar 😟";
        this.$emit("set:editing-donation", this.donationObj);
        console.error(error);
      }
    },
  },
};
</script>